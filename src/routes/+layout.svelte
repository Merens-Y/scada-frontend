<!-- TODO: 3 separate divs with alignments so that the logo stays on the left, the menu on the center, and the UX tools (user nav, darkmode, locale) on the right -->
<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import MainNavBar from '$lib/components/MainNavBar.svelte';
    import SvelteScada from '$lib/components/svgs/SvelteScada.svelte';
	import DarkmodeSelector from '$lib/components/DarkmodeSelector.svelte';
	import UserNav from '$lib/components/UserNav.svelte';
	import LocaleSelector from '$lib/components/LocaleSelector.svelte';
	import '../app.css';
</script>

<ModeWatcher />
<div class="border-b">
	<div class="flex h-12 md:h-16 lg:h-28 items-center px-4">
        <a href="/"> <SvelteScada class="px-2 w-16 md:w-20 lg:w-28" /></a>
		<MainNavBar />
		<div class="ml-auto flex items-center space-x-4">
			<LocaleSelector />
			<DarkmodeSelector />
			<UserNav />
		</div>
	</div>
</div>

<main>
	<slot />
</main>