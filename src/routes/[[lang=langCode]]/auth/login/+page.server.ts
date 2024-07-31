import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { eq } from 'drizzle-orm';
import { Argon2id } from 'oslo/password';
import { message, setError, superValidate } from 'sveltekit-superforms/server';
import type { Infer } from 'sveltekit-superforms';

import { createAndSetSession } from '$lib/user-database/authUtils.server';
import { database } from '$lib/user-database/database.server';
import { lucia } from '$lib/user-database/auth.server';
import { usersTable } from '$lib/user-database/schema';
import type { AlertMessageType } from '$lib/types';
import { DASHBOARD_ROUTE } from '$lib/utils/navLinks';
import { UserLoginZodSchema } from '$lib/validations/AuthZodSchemas';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async () => {
    const form = await superValidate(zod(UserLoginZodSchema))
	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	logInUser: async ({ request, cookies }) => {
		const form = await superValidate<Infer<typeof UserLoginZodSchema>, AlertMessageType>(
			request,
			zod(UserLoginZodSchema)
		);

		if (form.valid === false) {
			return message(form, {
				alertType: 'error',

				alertText: 'There was a problem with your submission.'
			});
		}

		const [existingUser] = await database
			.select({
				id: usersTable.id,
				password: usersTable.password
			})
			.from(usersTable)
			.where(eq(usersTable.email, form.data.email));

		if (existingUser === undefined) {
			return setError(form, 'email', 'Email not registered');
		}

		const validPassword = await new Argon2id().verify(
			existingUser.password,
			form.data.password
		);

		if (!validPassword) {
			return setError(form, 'password', 'Incorrect password');
		}

		await createAndSetSession(lucia, existingUser.id, cookies);

		throw redirect(303, DASHBOARD_ROUTE);
	}
};