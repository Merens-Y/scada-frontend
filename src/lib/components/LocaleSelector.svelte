<!-- Based on https://github.com/ivanhofer/typesafe-i18n-demo-sveltekit/blob/main/src/lib/LocaleSwitcher.svelte -->
<!-- TODO: properly implement this, we are using the cookie approach. -->
<script lang="ts">
	import { setLocale, locale } from '$lib/i18n/i18n-svelte'
	import { locales } from '$lib/i18n/i18n-util'	
</script>

<ul>
	{#each locales as l}
		<li>
			<a class:active={l === $locale} href='?lang={l}'>
				{l}
			</a>
		</li>
	{/each}
</ul>