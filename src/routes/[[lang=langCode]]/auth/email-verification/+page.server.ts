import { fail, redirect, type Actions, type Cookies } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import { message, superValidate } from 'sveltekit-superforms/client';
import type { Infer } from 'sveltekit-superforms';

import { route } from '$lib/ROUTES';
import {
	PENDING_USER_VERIFICATION_COOKIE_NAME,
	createAndSetSession,
	generateEmailVerificationCode,
	sendCodeRateLimiter,
	sendEmailVerificationCode,
	verifyCodeRateLimiter,
	verifyEmailVerificationCode,
	type PendingVerificationUserDataType
} from '$lib/user-database/authUtils.server';
import { database } from '$lib/user-database/database.server';
import { lucia } from '$lib/user-database/auth.server';
import { usersTable } from '$lib/user-database/schema';
import type { AlertMessageType } from '$lib/types';
import { DASHBOARD_ROUTE } from '$lib/utils/navLinks';
import { EmailVerificationCodeZodSchema } from '$lib/validations/AuthZodSchemas';
import { eq } from 'drizzle-orm';
import { zod } from 'sveltekit-superforms/adapters';

// Function to parse user data from cookie
const getUserDataFromCookie = (cookies: Cookies) => {
	const cookieData = cookies.get(PENDING_USER_VERIFICATION_COOKIE_NAME);

	if (!cookieData) return null;

	return JSON.parse(cookieData) as PendingVerificationUserDataType;
};

export const load = (async (event) => {
	await verifyCodeRateLimiter.cookieLimiter?.preflight(event);
	await sendCodeRateLimiter.cookieLimiter?.preflight(event);

	// Parse the user data from the cookie
	const userData = getUserDataFromCookie(event.cookies);

	if (!userData) {
		return redirect(303, route('/auth/register'));
	}

	return {
		pendingUserEmail: userData.email,
		emailVerificationCodeFormData: await superValidate(zod(EmailVerificationCodeZodSchema))
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	verifyCode: async (event) => {
		const { cookies, request } = event;

		const userData = getUserDataFromCookie(cookies);

		if (!userData) return redirect(303, route('/auth/register'));

		const emailVerificationCodeFormData = await superValidate<Infer<typeof EmailVerificationCodeZodSchema>, AlertMessageType>(
			request, zod(EmailVerificationCodeZodSchema)
		);

		if (emailVerificationCodeFormData.valid === false) {
			return message(emailVerificationCodeFormData, {
				alertType: 'error',
				alertText: 'Invalid verification code, please try again'
			});
		}

		const sendNewCodeRateLimiterResult = await verifyCodeRateLimiter.check(event);

		if (sendNewCodeRateLimiterResult.limited) {
			return message(
				emailVerificationCodeFormData,
				{
					alertType: 'error',
					alertText: `You have made too many requests and exceeded the rate limit. Please try again after ${sendNewCodeRateLimiterResult.retryAfter} seconds.`
				},
				{
					status: 429
				}
			);
		}

		const isVerificationCodeValid = await verifyEmailVerificationCode(
			userData.id,
			emailVerificationCodeFormData.data.verificationCode
		);

		if (isVerificationCodeValid.success === false) {
			return message(emailVerificationCodeFormData, {
				alertType: 'error',
				alertText: isVerificationCodeValid.message
			});
		}

		cookies.set(PENDING_USER_VERIFICATION_COOKIE_NAME, '', {
			maxAge: 0,
			path: route('/auth/email-verification')
		});

		await database
			.update(usersTable)
			.set({ isEmailVerified: true })
			.where(eq(usersTable.email, userData.email));

		await createAndSetSession(lucia, userData.id, cookies);

		throw redirect(303, DASHBOARD_ROUTE);
	},

	sendNewCode: async (event) => {
		const sendNewCodeRateLimiterResult = await sendCodeRateLimiter.check(event);

		if (sendNewCodeRateLimiterResult.limited) {
			return fail(429, {
				message: `You have made too many requests and exceeded the rate limit. Please try again after ${sendNewCodeRateLimiterResult.retryAfter} seconds.`
			});
		}

		const userData = getUserDataFromCookie(event.cookies);

		if (!userData) return redirect(303, route('/auth/register'));

		const emailVerificationCode = await generateEmailVerificationCode(userData.id, userData.email);

		try {
			const sendEmailVerificationCodeResult = await sendEmailVerificationCode(
				userData.email,
				emailVerificationCode
			);
			if (!sendEmailVerificationCodeResult.accepted.length) {
				return fail(500, {
					message: sendEmailVerificationCodeResult.response
				});
			}
			return {
				message: 'A new verification code has been sent to your email'
			};
		} catch (err) {
			// Handle error from sending the email
			return fail(500, {
				message: 'Failed to send verification email.',
				error: err // You can include more details if needed
			});
		}
		// const sendEmailVerificationCodeResult = await sendEmailVerificationCode(
		// 	userData.email,
		// 	emailVerificationCode
		// );

		// if (!sendEmailVerificationCodeResult.accepted.length) {
		// 	return fail(500, {
		// 		message: sendEmailVerificationCodeResult.response
		// 	});
		// }

		// return {
		// 	message: 'A new verification code has been sent to your email'
		// };
	}
};