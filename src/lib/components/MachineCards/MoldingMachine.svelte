<!-- DOCUMENT: Create appropiate wiki page only after setting proper types and props. -->
<!-- TODO: Add machine name edit button -->
<!-- TODO: Give better styling to tooltips for each widget -->
<!-- TODO: Add machine serial number to machine name if custom name is not available. Then show it as a subtitle if it is.  -->
<script lang="ts">
	// Translation function
	import { LL } from '$lib/i18n/i18n-svelte';
	// Shadcn-Svelte ui elements
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import * as Table from '$lib/components/ui/table/index.js';
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
	const macDataItems = [
		{
			itemName: 'Receta molde',
			itemUnit: '',
			itemInfo: '35 lbs nov.xml'
		},
		// {
		// 	itemName: 'Total ciclos',
		// 	itemUnit: '#',
		// 	itemInfo: '125.886',
		// },
		// {
		// 	itemName: 'Tiempo de ciclo',
		// 	itemUnit: '(seg)',
		// 	itemInfo: '8,70',
		// },
		// {
		// 	itemName: 'Último ciclo',
		// 	itemUnit: '(seg)',
		// 	itemInfo: '81,20',
		// },
		{
			itemName: 'Drenaje movil',
			itemUnit: '(seg)',
			itemInfo: '6,00'
		},
		{
			itemName: 'Drenaje fijo',
			itemUnit: '(seg)',
			itemInfo: '6,00'
		},
		{
			itemName: 'Presión fijo',
			itemUnit: '(bar)',
			itemInfo: '0,70'
		},
		{
			itemName: 'Presión móvil',
			itemUnit: '(bar)',
			itemInfo: '0,66'
		},
		{
			itemName: 'Vapor fijo',
			itemUnit: '(seg)',
			itemInfo: '7,00'
		},
		{
			itemName: 'Vapor móvil',
			itemUnit: '(seg)',
			itemInfo: '7,00'
		},
		{
			itemName: 'Agua fijo',
			itemUnit: '(seg)',
			itemInfo: '10,00'
		},
		{
			itemName: 'Agua móvil',
			itemUnit: '(seg)',
			itemInfo: '7,00'
		},
		{
			itemName: 'Vacío',
			itemUnit: '(seg)',
			itemInfo: '7,00'
		}
	];
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
			class="max-w-fit flex-col select-none cursor-default rounded-lg border bg-card text-card-foreground gap-4 m-4 p-4 shadow  md:w-[380px]"
		>
			<div class="flex w-full gap-x-1 mb-4 h-auto">
				<div class="flex-1 grow text-md uppercase">
					{moldingMachineProps.customName === ''
						? moldingMachineProps.id
						: moldingMachineProps.customName}
				</div>
				<div class="shrink w-6  md:w-32 lg:w-64 h-auto"></div>
				<StatusTag class="flex-none" {...tagProps} />
				<StatusLed class="flex-none" {...ledProps} />
			</div>
			<CyclePerformanceIndicator {...performanceIndicatorProps} />
			<Table.Root class="my-2">
				<Table.Body>
					{#each macDataItems as item, index (item.itemName)}
						<Table.Row>
							<Table.Cell class="font-bold">{item.itemName}</Table.Cell>
							<Table.Cell class="font-mono">{item.itemUnit}</Table.Cell>
							<Table.Cell class="text-right font-mono">{item.itemInfo}</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
			<MachineHealthBar {...healthBarProps} />
		</div>
	</ContextMenu.Trigger>
	<ContextMenu.Content>
		<ContextMenu.Item>{$LL.machineContextMenu.cycleHistory()}</ContextMenu.Item>
		<ContextMenu.Item>{$LL.machineContextMenu.renameMachine()}</ContextMenu.Item>
		<ContextMenu.Item>{$LL.machineContextMenu.disableMachine()}</ContextMenu.Item>
		<ContextMenu.Item class="bg-destructive text-slate-50"
			>{$LL.machineContextMenu.deleteMachine()}</ContextMenu.Item
		>
	</ContextMenu.Content>
</ContextMenu.Root>
