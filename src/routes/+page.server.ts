import type { PageServerLoad } from './$types';

import { createPageMetaTags } from '$lib/utils/metaTags';

export const load: PageServerLoad = async () => {
	const pageMetaTags = createPageMetaTags({
		title: 'Home page',
		description: 'Welcome to Svelte SCADA.'
	});

	return {
		pageMetaTags: Object.freeze(pageMetaTags)
	};
};