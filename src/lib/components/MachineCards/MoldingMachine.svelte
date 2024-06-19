<!-- DOCUMENT: Create appropiate wiki page only after setting proper types and props. -->
<!-- TODO: Add machine name edit button -->
<!-- TODO: Give better styling to tooltips for each widget -->
<!-- TODO: Add machine serial number to machine name if custom name is not available. Then show it as a subtitle if it is.  -->
<script lang="ts">
	// Translation function
	import { LL } from '$lib/i18n/i18n-svelte';
	// Shadcn-Svelte ui elements
	import * as ContextMenu from '$lib/components/ui/context-menu';
	// Custom Machine Card widget elements
	import CyclePerformanceIndicator from './ui/CyclePerformanceIndicator.svelte';
	import MachineHealthBar from './ui/MachineHealthBar.svelte';
	import StatusLed from './ui/StatusLED.svelte';
	import StatusTag from './ui/StatusTag.svelte';

	export let moldingMachineProps = {
		id: 'molding001',
		customName: ''
	};
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
			<MachineHealthBar {...healthBarProps} />
			<div class="text-xs md:text-sm text-center">{$LL.machineHealthBar.legend()}</div>
			<CyclePerformanceIndicator {...performanceIndicatorProps} />
			<div class="text-xs md:text-sm text-center">{$LL.performanceIndicator.legend()}</div>
		</div>
	</ContextMenu.Trigger>
	<ContextMenu.Content>
		<ContextMenu.Item>{$LL.machineContextMenu.details()}</ContextMenu.Item>
		<ContextMenu.Item>{$LL.machineContextMenu.cycleHistory()}</ContextMenu.Item>
		<ContextMenu.Item>{$LL.machineContextMenu.renameMachine()}</ContextMenu.Item>
		<ContextMenu.Item class='bg-destructive text-slate-50'>{$LL.machineContextMenu.deleteMachine()}</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>