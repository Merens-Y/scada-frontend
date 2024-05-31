<script lang="ts">
	// LL is a function that returns a translation function based on the current locale, don't change this!
	import { LL } from '$lib/i18n/i18n-svelte';

	import { cn } from '$lib/utils.js';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	let className: string | undefined | null = undefined;
	export { className as class };

    let navBarElements = [
        [$LL.navbar.machines(), '/machines'],
        [$LL.navbar.database(), '/machine-database'],
        [$LL.navbar.userManual(), '/user-manual'],
        [$LL.navbar.configuration(), '/configuration'],
        ];
</script>

<nav class={cn('', className)}>
	<div class="hidden md:flex items-center space-x-4 lg:space-x-6">
        {#each navBarElements as [name, href]}
            <a href={href} class="px-2 text-sm lg:text-lg font-medium text-muted-foreground transition-colors hover:text-primary">
                {name}
            </a>
        {/each}
	</div>
	<div class="flex md:hidden items-center space-x-4">
		<Collapsible.Root class="w-[150px] space-y-2">
			<div class="flex items-center justify-between space-x-4 px-4">
				<h4 class="text-sm font-semibold">Menú</h4>
				<Collapsible.Trigger asChild let:builder>
					<Button builders={[builder]} variant="ghost" size="sm" class="w-9 p-0">
						<ChevronsUpDown class="h-4 w-4" />
						<span class="sr-only">Abrir Menú</span>
					</Button>
				</Collapsible.Trigger>
			</div>
			<Collapsible.Content class="fixed space-y-2">
                {#each navBarElements as [name, href]}
                    <div class="bg-primary-background bg-primary-foreground rounded-md border px-4 py-3 font-mono text-sm">
                        <a
                            href={href}
                            class="text-sm font-medium transition-colors hover:text-primary"
                        >
                            {name}
                        </a>
                    </div>
                {/each}
			</Collapsible.Content>
		</Collapsible.Root>
	</div>
</nav>
