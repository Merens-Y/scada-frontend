type Locales = import('$i18n/i18n-types').Locales
type TranslationFunctions = import('$i18n/i18n-types').TranslationFun

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: Locales;
			LL: TranslationFunctions;
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}
		interface PageData {
			pageMetaTags?: MetaTagsProps;
			isUserLoggedIn: boolean;
			flash?: { type: 'success' | 'error'; message: string };
		}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
