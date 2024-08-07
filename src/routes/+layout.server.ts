import type { LayoutServerLoad } from './$types';
import { detectLocale } from '$lib/i18n/i18n-util';
import { redirect } from '@sveltejs/kit';

import { loadFlash } from 'sveltekit-flash-message/server';

import { createBaseMetaTags } from '$lib/utils/metaTags';

const langParam = 'lang';

export const load = loadFlash(async ({ cookies, url, locals: { session } }) => {
	const baseMetaTags = createBaseMetaTags(url);
	// Using a GET var "lang" to change locale
	const newLocale = url.searchParams.get(langParam);
	if (newLocale) {
		cookies.set(langParam, newLocale, { path: '/' });
		url.searchParams.delete(langParam);
		// Redirect to remove the GET var
		throw redirect(303, url.toString());
	}
	// Get the locale from the cookie
	const locale = detectLocale(() => [cookies.get(langParam) ?? '']);
	return {
		isUserLoggedIn: session !== null,
		baseMetaTags: Object.freeze(baseMetaTags),
		locale
	};
}) satisfies LayoutServerLoad;
