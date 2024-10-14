import { sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
	id: text('id').primaryKey().notNull(),

	name: text('name').notNull(),

	email: text('email').notNull().unique(),

	isEmailVerified: int('is_email_verified', { mode: 'boolean' }).notNull().default(false),

	password: text('password').notNull(),

    userType: text('user_type', { enum: ['admin', 'default'] }).notNull(),

	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const emailVerificationCodesTable = sqliteTable('email_verification_codes', {
	id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),

	userId: text('user_id')
		.notNull()
		.references(() => usersTable.id),

	code: text('code').notNull(),

	email: text('email').notNull(),

	expiresAt: int('expires_at', { mode: 'timestamp' }).notNull()
});

export const usersSessionsTable = sqliteTable('users_sessions', {
	id: text('id').primaryKey().notNull(),

	userId: text('user_id')
		.notNull()
		.references(() => usersTable.id),

	expiresAt: int('expires_at').notNull()
});

export const passwordResetTokensTable = sqliteTable('password_reset_tokens', {
	id: text('id').primaryKey().notNull().unique(),

	userId: text('user_id')
		.notNull()
		.references(() => usersTable.id),

	expiresAt: int('expires_at', { mode: 'timestamp' }).notNull()
});

export type UserInsertSchema = typeof usersTable.$inferInsert;