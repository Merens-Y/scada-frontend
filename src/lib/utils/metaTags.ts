import type { MetaTagsProps } from 'svelte-meta-tags';

export function createBaseMetaTags(url: URL): MetaTagsProps {
	const title = 'Svelte SCADA Dashboard';
	const description =
		'A twist on interfaces for SCADA software.';
	const canonicalUrl = new URL(url.pathname, url.origin).href;

	return {
		title: title,
		titleTemplate: '%s | Tools for Machine Monitoring',
		description: description,
		canonical: canonicalUrl,

		keywords: [
			'Basekit',
			'sveltekit',
			'svelte',
			'tailwindcss',
			'svelte-sonner',
			'svelte-meta-tags'
		],

		// openGraph: {
		// 	type: 'website',
		// 	url: canonicalUrl,
		// 	locale: 'en_IE',
		// 	title: title,
		// 	description: description,
		// 	siteName: 'BaseKit',
		// 	images: [
		// 		{
		// 			url: 'https://www.example.ie/og-image.jpg',
		// 			alt: 'Og Image Alt',
		// 			width: 800,
		// 			height: 600,
		// 			secureUrl: 'https://www.example.ie/og-image.jpg',
		// 			type: 'image/jpeg'
		// 		}
		// 	]
		// },

		// twitter: {
		// 	handle: '@edwardspresume',
		// 	site: canonicalUrl,
		// 	cardType: 'summary_large_image',
		// 	title: title,
		// 	description: description,
		// 	image: 'https://www.example.ie/twitter-image.jpg',
		// 	imageAlt: 'Twitter image alt'
		// },

		// additionalLinkTags: [
		// 	{
		// 		rel: 'apple-touch-icon',
		// 		href: '/favicons/apple-touch-icon.png'
		// 	},
		// 	{
		// 		rel: 'icon',
		// 		type: 'image/svg+xml',
		// 		href: '/favicons/favicon.svg'
		// 	},
		// 	{
		// 		rel: 'mask-icon',
		// 		href: '/favicons/mask-icon.svg'
		// 	},
		// 	{
		// 		rel: 'alternate icon',
		// 		type: 'image/png',
		// 		href: '/favicons/favicon-32x32.png'
		// 	},
		// 	{
		// 		rel: 'manifest',
		// 		href: `/site.webmanifest`,
		// 		crossOrigin: 'use-credentials'
		// 	}
		// ]
	};
}

export function createPageMetaTags(metaTags: MetaTagsProps): MetaTagsProps {
	return {
		...metaTags
	};
}