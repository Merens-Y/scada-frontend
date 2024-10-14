import * as dotenv from 'dotenv';
import type { Cookies } from '@sveltejs/kit';
import { route } from '$lib/ROUTES';

import { TimeSpan, generateId, type Lucia } from 'lucia';
import { eq } from 'drizzle-orm';
import { EMAIL_VERIFICATION_CODE_LENGTH } from '$lib/validations/AuthZodSchemas';
import { createDate, isWithinExpirationDate } from 'oslo';
import { alphabet, generateRandomString } from 'oslo/crypto';
import { Argon2id } from 'oslo/password';

import {
	emailVerificationCodesTable,
	passwordResetTokensTable,
	usersTable,
	type UserInsertSchema
} from './schema';
import { database } from './database.server';

import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';

import nodemailer from "nodemailer";

export const PENDING_USER_VERIFICATION_COOKIE_NAME = 'pendingUserVerification';
export type PendingVerificationUserDataType = {
	id: string;
	email: string;
};

dotenv.config();
const { GOOGLE_EMAIL, GOOGLE_EMAIL_APP_PASSWORD } = process.env;
const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: GOOGLE_EMAIL,
		pass: GOOGLE_EMAIL_APP_PASSWORD,
	},
});

type EmailParams = {
	from: string;
	to: string;
	subject: string;
	textContent: string;
	htmlContent: string;
};

type EmailCallback = (err: Error | null, info: {
    messageId: string;
    envelope: object;
    accepted: string[];
    rejected: string[];
    pending: string[];
    response: string;
} | null) => void;

function createRateLimiter(cookieName: string, cookieSecret: string) {
	return new RetryAfterRateLimiter({
		// A rate is defined as [number, unit]
		IP: [10, 'h'], // IP address limiter, allowing up to  10 requests per hour
		IPUA: [5, 'm'], // IP + User Agent limiter, allowing up to  5 requests per minute

		cookie: {
			/* Cookie limiter. This limits the number of requests from the same browser (identified by a unique cookie) to  2 per minute.

			It helps prevent a single browser session from making too many requests in a short time, providing an extra layer of protection against abuse.
		*/
			name: cookieName, // Unique cookie name for this limiter
			secret: cookieSecret,
			rate: [2, 'm'], // Allows up to  2 requests per minute from the same browser session
			preflight: true // Require preflight call (see load function)
		}
	});
}

export const verifyCodeRateLimiter = createRateLimiter(
	'verifyCodeRateLimiterCookieId',
	'verifyCodeRateLimiterCookieSecret'
);

export const sendCodeRateLimiter = createRateLimiter(
	'sendCodeRateLimiterCookieId',
	'sendCodeRateLimiterCookieSecret'
);

export const passwordResetEmailRateLimiter = createRateLimiter(
	'passwordResetEmailRateLimiterCookieId',
	'passwordResetEmailRateLimiterCookieSecret'
);

export const passwordResetPageActionRateLimiter = createRateLimiter(
	'passwordResetPageActionRateLimiterCookieId',
	'passwordResetPageActionRateLimiterCookieSecret'
);

export const passwordResetDashboardPageActionRateLimiter = createRateLimiter(
	'passwordResetDashboardPageActionRateLimiterCookieId',
	'passwordResetDashboardPageActionRateLimiterCookieSecret'
);

export const createAndSetSession = async (lucia: Lucia, userId: string, cookies: Cookies) => {
	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
};

export const deleteSessionCookie = async (lucia: Lucia, cookies: Cookies) => {
	const sessionCookie = lucia.createBlankSessionCookie();

	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
};

export const checkIfUserExists = async (email: string) => {
	const [existingUser] = await database
		.select({
			id: usersTable.id,
			email: usersTable.email,
			password: usersTable.password,
			isEmailVerified: usersTable.isEmailVerified
		})
		.from(usersTable)
		.where(eq(usersTable.email, email));

	return existingUser;
};

export const insertNewUser = async (user: UserInsertSchema) => {
	return await database.insert(usersTable).values(user);
};

export const getAllUsers = async () => {
	const queryResult = await database
		.select({
			id: usersTable.id,
			name: usersTable.name,
			email: usersTable.email
		})
		.from(usersTable);

	return queryResult;
};

export const deleteAllUsers = async () => {
	return await database.delete(usersTable);
};

const sendEmail = (params: EmailParams, callback: EmailCallback) => {
    transporter.sendMail({
        from: `Lucia V3 example <${params.from}>`,
        to: [params.to],
        subject: params.subject,
        text: params.textContent,
        html: params.htmlContent,
    }, (err, info) => {
        if (err) {
            // If there is an error, pass it to the callback
            return callback(err, null);
        }
        // If successful, pass the info object to the callback
        callback(null, {
            messageId: info.messageId,
            envelope: info.envelope,
            accepted: info.accepted.map(addr => typeof addr === 'string' ? addr : addr.address), // Ensure only strings
            rejected: info.rejected.map(addr => typeof addr === 'string' ? addr : addr.address),
            pending: info.pending.map(addr => typeof addr === 'string' ? addr : addr.address),
            response: info.response,
        });
    });
};

export const sendEmailVerificationCode = async (email: string, code: string) => {
	const htmlContent = `
	<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
		<h1>Email Verification</h1>
		<p>Thank you for taking the time to verify your email address. Your verification code is:</p>
		<p style="font-size: 20px;"><strong>${code}</strong></p>
		<p>Please enter this code in the verification field to complete the process. If you did not request this verification, please ignore this email.</p>
	</div>
	`;
	const textContent = `
	Email Verification
	Thank you for taking the time to verify your email address. Your verification code is:
	${code}
	Please enter this code in the verification field to complete the process. If you did not request this verification, please ignore this email.
	`;

	return new Promise((resolve, reject) => {
		sendEmail({
			from: 'scada-frontend@mailer.dev',
			to: email,
			subject: 'Email Verification Code Request',
			textContent,
			htmlContent
		}, (err, info) => {
			if (err) {
				return reject(err);
			}
			resolve(info);
		});
	});
};

export const sendPasswordResetEmail = async (email: string, resetToken: string) => {
	const htmlContent = `
	<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
		<h1>Password Reset Request</h1>
		<p>We've received a request to reset your password. If you didn't make the request, just ignore this email. Otherwise, you can reset your password using the link below.</p>

		<p>
		<a href="http://localhost:3000${route('/auth/reset-password')}?token=${resetToken}" style="color: #337ab7; text-decoration: none;">Reset your password</a>
		</p>

		<p>If you need help or have any questions, please contact our support team. We're here to help!</p>
	</div>
	`;
	const textContent = `
	Password Reset Request
	We've received a request to reset your password. If you didn't make the request, just ignore this email. Otherwise, you can reset your password using the link below.
	Reset your password: http://localhost:3000${route('/auth/reset-password')}?token=${resetToken}
	If you need help or have any questions, please contact our support team. We're here to help!
	`;

	return new Promise((resolve, reject) => {
		sendEmail({
			from: 'scada-frontend@mailer.dev',
			to: email,
			subject: 'Password Reset Request',
			textContent,
			htmlContent
		}, (err, info) => {
			if (err) {
				return reject(err);
			}
			resolve(info);
		});
	});
};

export const generateEmailVerificationCode = async (userId: string, email: string) => {
	const code = generateRandomString(EMAIL_VERIFICATION_CODE_LENGTH, alphabet('0-9'));

	// This transaction block ensures atomicity and data integrity. If an error occurs while inserting the new code, the transaction will be rolled back, preventing the deletion of old verification codes. This maintains the state of the database.
	await database.transaction(async (trx) => {
		// Delete any existing verification codes for the user
		await trx
			.delete(emailVerificationCodesTable)
			.where(eq(emailVerificationCodesTable.userId, userId));

		// Insert the new verification code
		await trx.insert(emailVerificationCodesTable).values({
			userId,
			email,
			code,
			expiresAt: createDate(new TimeSpan(5, 'm')) // 5 minutes
		});
	});

	return code;
};

export const verifyEmailVerificationCode = async (userId: string, code: string) => {
	const [verificationCode] = await database
		.select()
		.from(emailVerificationCodesTable)
		.where(eq(emailVerificationCodesTable.userId, userId));

	// If there's no verification code for the user in the database
	if (!verificationCode) {
		return { success: false, message: 'Verification code not found.' };
	}

	// If the provided code doesn't match the one in the database
	if (verificationCode.code !== code) {
		return { success: false, message: 'The provided verification code is incorrect.' };
	}

	// If the verification code has expired
	if (!isWithinExpirationDate(verificationCode.expiresAt)) {
		return {
			success: false,
			message: 'The verification code has expired, please request a new one.'
		};
	}

	// If everything is okay, delete the verification code from the database
	await database
		.delete(emailVerificationCodesTable)
		.where(eq(emailVerificationCodesTable.userId, userId));

	// Return a success message
	return { success: true, message: 'Email verification successful!' };
};

export const createPasswordResetToken = async (userId: string) => {
	const tokenId = generateId(40);

	await database.transaction(async (trx) => {
		await trx.delete(passwordResetTokensTable).where(eq(passwordResetTokensTable.userId, userId));

		await trx.insert(passwordResetTokensTable).values({
			id: tokenId,
			userId,
			expiresAt: createDate(new TimeSpan(15, 'm')) // 15 minutes
		});
	});

	return tokenId;
};

export const verifyPasswordResetToken = async (tokenId: string) => {
	const [passwordResetToken] = await database
		.select()
		.from(passwordResetTokensTable)
		.where(eq(passwordResetTokensTable.id, tokenId));

	if (!passwordResetToken || passwordResetToken.id !== tokenId) {
		return {
			success: false,
			message: 'The password reset link is invalid. Please request a new one.'
		};
	}

	if (!isWithinExpirationDate(passwordResetToken.expiresAt)) {
		return {
			success: false,
			message: 'The password reset link has expired. Please request a new one.'
		};
	}

	return {
		success: true,
		userId: passwordResetToken.userId,
		message: 'Password reset token is valid.'
	};
};

export const isSameAsOldPassword = async (userId: string, newPassword: string) => {
	const [user] = await database
		.select({
			password: usersTable.password
		})
		.from(usersTable)
		.where(eq(usersTable.id, userId));

	// If user doesn't exist, return false
	if (!user) {
		return false;
	}

	// Verify the old password
	const isSamePassword = await new Argon2id().verify(user.password, newPassword);

	return isSamePassword;
};