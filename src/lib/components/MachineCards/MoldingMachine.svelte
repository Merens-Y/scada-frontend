<!-- DOCUMENT: Create appropiate wiki page only after setting proper types and props. -->
<!-- TODO: Add machine name edit button -->
<!-- TODO: Give better styling to tooltips for each widget -->
<!-- TODO: Add machine serial number to machine name if custom name is not available. Then show it as a subtitle if it is.  -->
<script lang="ts">
	// Translation function
	import { LL } from '$lib/i18n/i18n-svelte';
	// Shadcn-Svelte ui elements
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Button } from '$lib/components/ui/button';
	// Lucide icons
	import ChevronsUp from 'lucide-svelte/icons/chevrons-up';
	import ChevronsDown from 'lucide-svelte/icons/chevrons-down';
	// Custom Machine Card widget elements
	import CyclePerformanceIndicator from './ui/CyclePerformanceIndicator.svelte';
	import MachineHealthBar from './ui/MachineHealthBar.svelte';
	import StatusLed from './ui/StatusLED.svelte';
	import StatusTag from './ui/StatusTag.svelte';
	import MoldTypeIndicator from './ui/MoldTypeIndicator.svelte';

	export let moldingMachineProps = {
		id: 'molding001',
		customName: ''
	};
	let detailedView = false;
	// function that will be called when the button is clicked, it will loop through ledProps and then flip the booleans.
	function randomizeMachineProps() {
		return;
	}

	const tagProps = {
		isAuto: true,
		isDisconnected: false
	};
	const ledProps = {
		isRunning: true,
		isDisconnected: false
	};
	const healthBarProps = {
		count: 605,
		countIdeal: 500,
		countMax: 700
	};
	const performanceIndicatorProps = {
		currentTime: 155,
		lastTime: 106,
		idealTime: 100,
		maxTime: 180
	};
</script>

<ContextMenu.Root>
	<Collapsible.Root class="w-full" bind:open={detailedView}>
		<ContextMenu.Trigger>
			<div
				class="max-w-fit flex-col select-none cursor-default rounded-lg border bg-card text-card-foreground gap-4 m-2 p-4 shadow sm:w-[350px] md:w-[400px] md:shadow-lg lg:w-[450px]"
			>
				<div class="flex w-full gap-x-1 mb-4 h-auto">
					<div class="flex-1 grow text-md uppercase">
						{moldingMachineProps.customName === ''
							? moldingMachineProps.id
							: moldingMachineProps.customName}
					</div>
					<div class="shrink w-6 sm:w-16 md:w-32 lg:w-64 h-auto"></div>
					<StatusTag class="flex-none" {...tagProps} />
					<StatusLed class="flex-none" {...ledProps} />
				</div>
				<CyclePerformanceIndicator {...performanceIndicatorProps} />
				<MoldTypeIndicator class="w-20 md:w-40 h-auto my-2" moldPiece={"full"} moldUnits={5} />
				<MachineHealthBar {...healthBarProps} />

				<Collapsible.Content class="space-y-2">
					<Tabs.Root value="details" class="w-full">
						<Tabs.List class="grid w-full grid-cols-2">
							<Tabs.Trigger value="details">
								{$LL.machineCollapsibleTabs.details()}
							</Tabs.Trigger>
							<Tabs.Trigger value="recipe">
								{$LL.machineCollapsibleTabs.recipe()}
							</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content value="details">
							<div>Further detailed production data.</div>
						</Tabs.Content>
						<Tabs.Content value="recipe">
							<div>Contents of the recipe.</div>
						</Tabs.Content>
					</Tabs.Root>
				</Collapsible.Content>
				<div class="flex items-center justify-between space-x-4 px-4">
					<Collapsible.Trigger asChild let:builder>
						<div class="flex-1"></div>
						<Button builders={[builder]} variant="ghost" size="sm" class="w-9 p-0">
							{#if detailedView}
								<ChevronsUp class="h-4 w-4" />
							{:else}
								<ChevronsDown class="h-4 w-4" />
							{/if}
							<span class="sr-only">Open details</span>
						</Button>
						<div class="flex-1"></div>
					</Collapsible.Trigger>
				</div>
			</div>
		</ContextMenu.Trigger>
		<ContextMenu.Content>
			<ContextMenu.Item
				><Collapsible.Trigger class="w-full text-left"
					>{$LL.machineContextMenu.details()}</Collapsible.Trigger
				></ContextMenu.Item
			>
			<ContextMenu.Item>{$LL.machineContextMenu.cycleHistory()}</ContextMenu.Item>
			<ContextMenu.Item>{$LL.machineContextMenu.renameMachine()}</ContextMenu.Item>
			<ContextMenu.Item class="bg-destructive text-slate-50"
				>{$LL.machineContextMenu.deleteMachine()}</ContextMenu.Item
			>
		</ContextMenu.Content>
	</Collapsible.Root>
</ContextMenu.Root>
