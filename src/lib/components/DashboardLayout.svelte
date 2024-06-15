<script lang="ts">
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
	import Search from 'lucide-svelte/icons/search';
	import Factory from 'lucide-svelte/icons/factory';
	import Database from 'lucide-svelte/icons/database';
	import BookOpenText from 'lucide-svelte/icons/book-open-text';
	import Settings from 'lucide-svelte/icons/settings';
    // import shadcn-svelte components
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';

	const dashboardElements = [
		{ name: $LL.navbar.machines(), href: '/machines', icon: Factory },
		{ name: $LL.navbar.database(), href: '/machine-database', icon: Database },
		{ name: $LL.navbar.userManual(), href: '/user-manual', icon: BookOpenText },
		{ name: $LL.navbar.configuration(), href: '/configuration', icon: Settings }
	];
</script>

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
	<div class="hidden border-r bg-muted/40 md:block">
		<div class="flex h-full max-h-screen flex-col gap-2">
			<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<a href="/" class="flex items-center gap-2 font-semibold">
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
							class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
						>
							<svelte:component this={dashboardElement.icon} class="h-4 w-4" />
							{dashboardElement.name}
						</a>
					{/each}
				</nav>
			</div>
		</div>
	</div>
	<div class="flex flex-col">
		<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
			<Sheet.Root>
				<Sheet.Trigger asChild let:builder>
					<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
						<Menu class="h-5 w-5" />
						<span class="sr-only">Toggle navigation menu</span>
					</Button>
				</Sheet.Trigger>
				<Sheet.Content side="left" class="flex flex-col">
					<nav class="grid gap-2 text-lg font-medium">
						<a href="/" class="flex items-center gap-2 text-lg font-semibold">
							<SvelteScada class="h-auto w-16 py-2" />
						</a>
                        {#each dashboardElements as dashboardElement (dashboardElement.name)}
                            <a
                                href={dashboardElement.href}
                                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                            >
                                <svelte:component this={dashboardElement.icon} class="h-5 w-5" />
                                {dashboardElement.name}
                            </a>
                        {/each}
					</nav>
				</Sheet.Content>
			</Sheet.Root>
			<div class="w-full flex-1">
				<form>
					<div class="relative">
						<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search products..."
							class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
						/>
					</div>
				</form>
			</div>
            <LocaleSelector />
            <DarkmodeSelector />
			<UserNav />
		</header>
		<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
			<slot />
		</main>
	</div>
</div>
