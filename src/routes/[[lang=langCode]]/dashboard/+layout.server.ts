import type { LayoutServerLoad } from './$types';

import { redirect } from 'sveltekit-flash-message/server';
import { getAllUsers } from '$lib/user-database/databaseUtils.server';
import { route } from '$lib/ROUTES';

export const load = (async ({ locals: { user }, cookies }) => {
    if (!user) {
		throw redirect(
			route('/auth/login'),
			{
				type: 'error',
				message: 'You must be logged in to view the dashboard.'
			},
			cookies
		);
	}

    return {
        loggedInUserName: user.name,
        loggedInUserMail: user.email,
        loggedInUserRole: user.user_type,
		allUsers: await getAllUsers()
    };
}) satisfies LayoutServerLoad;
