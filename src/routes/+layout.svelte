<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import MainNavBar from '$lib/components/MainNavBar.svelte';
    import Aislapol from '$lib/components/svgs/Aislapol.svelte';
	import DarkmodeSelector from '$lib/components/DarkmodeSelector.svelte';
	import UserNav from '$lib/components/UserNav.svelte';
	import '../app.css';
</script>

<ModeWatcher />
<div class="border-b">
	<div class="flex h-12 md:h-16 lg:h-28 items-center px-4">
        <a href="/"> <Aislapol class="px-2 w-16 md:w-20 lg:w-28" /></a>
		<MainNavBar />
		<div class="ml-auto flex items-center space-x-4">
			<DarkmodeSelector />
			<UserNav />
		</div>
	</div>
</div>

<main>
	<slot />
</main>