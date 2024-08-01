<script lang="ts">
	import { page } from '$app/stores';
	import { route } from '$lib/ROUTES';
	// import translation functions
	import { LL } from '$lib/i18n/i18n-svelte';
	// import components
	import SvelteScada from './svgs/SvelteScada.svelte';
	import DarkmodeSelector from './DarkmodeSelector.svelte';
	import UserNav from './UserNav.svelte';
	import LocaleSelector from './LocaleSelector.svelte';
	// import icons
	import Bell from 'lucide-svelte/icons/bell';
	import Menu from 'lucide-svelte/icons/menu';
	import Factory from 'lucide-svelte/icons/factory';
	import Database from 'lucide-svelte/icons/database';
	import BookOpenText from 'lucide-svelte/icons/book-open-text';
	import Settings from 'lucide-svelte/icons/settings';
	// import shadcn-svelte components
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';

	let sheetOpen = false;

	const dashboardElements = [
		{ name: $LL.navbar.machines(), href: route('/dashboard/machines'), icon: Factory },
		{ name: $LL.navbar.database(), href: route('/dashboard/machine-database'), icon: Database },
		{ name: $LL.navbar.userManual(), href: route('/dashboard/user-manual'), icon: BookOpenText },
		{ name: $LL.navbar.configuration(), href: route('/dashboard/configuration'), icon: Settings }
	];
	export let user;
</script>

<div class="grid min-h-screen w-full lg:grid-cols-[225px_1fr]">
	<div class="hidden border-r bg-muted/40 lg:block">
		<div class="flex h-full max-h-screen flex-col gap-2">
			<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<a href={route('/dashboard')} class="flex items-center gap-2 font-semibold">
					<SvelteScada class="h-auto w-16 lg:w-20" />
				</a>
				<Button variant="outline" size="icon" class="ml-auto h-8 w-8">
					<Bell class="h-4 w-4" />
					<span class="sr-only">{$LL.navbar.toggleNotifications()}</span>
				</Button>
			</div>
			<div class="flex-1">
				<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
					{#each dashboardElements as dashboardElement (dashboardElement.name)}
						<a
							href={dashboardElement.href}
							class="flex items-center gap-3 rounded-lg px-3 py-2 {$page.url.pathname.includes(
								dashboardElement.href
							)
								? 'bg-accent text-primary/75'
								: ''} text-muted-foreground transition-all hover:text-primary hover:bg-muted"
						>
							<svelte:component this={dashboardElement.icon} class="h-4 w-4" />
							{dashboardElement.name}
						</a>
					{/each}
				</nav>
			</div>
		</div>
	</div>
	<div class="flex flex-col w-full">
		<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px]">
			<div class="flex-initial">
				<Sheet.Root bind:open={sheetOpen}>
					<Sheet.Trigger asChild let:builder>
						<Button variant="outline" size="icon" class="shrink-0 lg:hidden" builders={[builder]}>
							<Menu class="h-5 w-5" />
							<span class="sr-only">Toggle navigation menu</span>
						</Button>
					</Sheet.Trigger>
					<Sheet.Content side="left" class="flex flex-col">
						<nav class="grid gap-2 text-lg font-medium">
							<a
								on:click={() => (sheetOpen = false)}
								href={route('/dashboard')}
								class="flex items-center gap-2 text-lg font-semibold"
							>
								<SvelteScada class="h-auto w-16 py-2" />
							</a>
							{#each dashboardElements as dashboardElement (dashboardElement.name)}
								<a
									on:click={() => (sheetOpen = false)}
									href={dashboardElement.href}
									class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 {$page.url.pathname.includes(
										dashboardElement.href
									)
										? 'bg-accent text-primary/75'
										: ''} text-muted-foreground hover:text-foreground"
								>
									<svelte:component this={dashboardElement.icon} class="h-5 w-5" />
									{dashboardElement.name}
								</a>
							{/each}
						</nav>
					</Sheet.Content>
				</Sheet.Root>
			</div>
			<div class="flex-1"></div>
			<div class="flex gap-4 flex-initial">
				<LocaleSelector />
				<DarkmodeSelector />
				<UserNav {...user} />
			</div>
		</header>
		<main class="flex flex-1 flex-col gap-2 p-1 lg:gap-4 lg:p-2">
			<slot />
		</main>
	</div>
</div>
