import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { message, setError, superValidate } from 'sveltekit-superforms/server';
import type { Infer } from 'sveltekit-superforms';

import { lucia } from '$lib/user-database/auth.server';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';

import { createAndSetSession } from '$lib/user-database/authUtils.server';
import { checkIfEmailExists, insertNewUser } from '$lib/user-database/databaseUtils.server';
import type { AlertMessageType } from '$lib/types';
import { logError } from '$lib/utils/index';
import { DASHBOARD_ROUTE } from '$lib/utils/navLinks';
import { RegisterUserZodSchema } from '$lib/validations/AuthZodSchemas';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async () => {
    const form = await superValidate(zod(RegisterUserZodSchema))
	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	registerUser: async ({ request, cookies }) => {
		const form = await superValidate<
			Infer<typeof RegisterUserZodSchema>,
			AlertMessageType
		>(request, zod(RegisterUserZodSchema));

		if (form.valid === false) {
			return message(form, {
				alertType: 'error',
				alertText: 'Please check your entries, the form contains invalid data'
			});
		}

		try {
			const isEmailAlreadyRegistered = await checkIfEmailExists(form.data.email);

			if (isEmailAlreadyRegistered === true) {
				return setError(form, 'email', 'Email already registered');
			}

			const userId = generateId(15);
			const hashedPassword = await new Argon2id().hash(form.data.password);

			await insertNewUser({
				id: userId,
				name: form.data.name,
				email: form.data.email,
				password: hashedPassword,
				userType: 'default'
			});

			await createAndSetSession(lucia, userId, cookies);
		} catch (error) {
			logError(error);

			return message(form, {
				alertType: 'error',
				alertText: 'An error occurred while processing your request. Please try again.'
			});
		}

		throw redirect(303, DASHBOARD_ROUTE);
	}
};
