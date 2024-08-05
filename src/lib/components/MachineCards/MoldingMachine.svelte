<!-- DOCUMENT: Create appropiate wiki page only after setting proper types and props. -->
<!-- TODO: Add machine name edit button -->
<!-- TODO: Give better styling to tooltips for each widget -->
<!-- TODO: Add machine serial number to machine name if custom name is not available. Then show it as a subtitle if it is.  -->
<script lang="ts">
	import { page } from '$app/stores';
	// Translation function
	import { LL } from '$lib/i18n/i18n-svelte';
	// Shadcn-Svelte ui elements
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Dialog from '$lib/components/ui/dialog';
	// Custom Machine Card widget elements
	import CyclePerformanceIndicator from './ui/CyclePerformanceIndicator.svelte';
	import MachineHealthBar from './ui/MachineHealthBar.svelte';
	import StatusLed from './ui/StatusLED.svelte';
	import StatusTag from './ui/StatusTag.svelte';

	export let moldingMachineProps = {
		id: 'molding001',
		customName: ''
	};
	export let macDataStatus = [
		{
			itemName: 'Total ciclos',
			itemUnit: '#',
			itemInfo: '125.886'
		},
		{
			itemName: 'Tiempo de ciclo',
			itemUnit: '(seg)',
			itemInfo: '8,70'
		},
		{
			itemName: 'Último ciclo',
			itemUnit: '(seg)',
			itemInfo: '81,20'
		}
	];
	export let macDataTimers = [
		{
			itemName: 'Automático',
			itemUnit: '(hh:mm:ss)',
			itemInfo: '09:12:05'
		},
		{
			itemName: 'Manual',
			itemUnit: '(hh:mm:ss)',
			itemInfo: '01:00:33'
		},
		{
			itemName: 'Total',
			itemUnit: '(hh:mm:ss)',
			itemInfo: '10:12:38'
		},
		{
			itemName: 'Hidráulico',
			itemUnit: '(hh:mm:ss)',
			itemInfo: '429:12:38'
		}
	];
	export let macDataItems = [
		{
			itemName: 'Receta molde',
			itemUnit: '',
			itemInfo: '35 lbs nov.xml'
		},
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
	export let tagProps = {
		isAuto: true,
		isDisconnected: false
	};
	export let ledProps = {
		isRunning: true,
		isDisconnected: false
	};
	export let healthBarProps = {
		count: 605,
		countIdeal: 500,
		countMax: 700
	};
	export let performanceIndicatorProps = {
		currentTime: 155,
		lastTime: 106,
		idealTime: 100,
		maxTime: 180
	};
	let dialogOpen = false;
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger>
		<div
			class="max-w-fit flex-col select-none cursor-default hover:cursor-pointer rounded-lg border bg-card text-card-foreground gap-4 m-4 p-4 shadow md:w-[380px]"
		>
			<a on:click={() => (dialogOpen = true)} href={$page.url.pathname}>
				<div class="flex w-full gap-x-1 mb-4 h-auto">
					<div class="flex-1 grow text-md uppercase">
						{moldingMachineProps.customName === ''
							? moldingMachineProps.id
							: moldingMachineProps.customName}
					</div>
					<div class="shrink w-6 md:w-32 lg:w-64 h-auto"></div>
					<StatusTag class="flex-none" {...tagProps} />
					<StatusLed class="flex-none" {...ledProps} />
				</div>
				<CyclePerformanceIndicator {...performanceIndicatorProps} />
				<Table.Root class="my-2">
					<Table.Body>
						{#each macDataItems as item, index (item.itemName)}
							<Table.Row class={index % 2 ? '' : 'bg-muted'}>
								<Table.Cell class="font-bold">{item.itemName}</Table.Cell>
								<Table.Cell class="font-mono">{item.itemUnit}</Table.Cell>
								<Table.Cell class="text-right font-mono">{item.itemInfo}</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
				<MachineHealthBar {...healthBarProps} />
			</a>
		</div>
	</ContextMenu.Trigger>
	<ContextMenu.Content>
		<ContextMenu.Item class="cursor-pointer"
			>{$LL.machineContextMenu.cycleHistory()}</ContextMenu.Item
		>
		<ContextMenu.Item class="cursor-pointer"
			>{$LL.machineContextMenu.renameMachine()}</ContextMenu.Item
		>
		<ContextMenu.Item class="cursor-pointer"
			>{$LL.machineContextMenu.disableMachine()}</ContextMenu.Item
		>
		<ContextMenu.Item class="cursor-pointer bg-destructive text-slate-50"
			>{$LL.machineContextMenu.deleteMachine()}</ContextMenu.Item
		>
	</ContextMenu.Content>
</ContextMenu.Root>
<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class="sm:max-w-[425px] lg:max-w-max">
		<Dialog.Header>
			<Dialog.Title
				>{moldingMachineProps.customName
					? moldingMachineProps.customName
					: moldingMachineProps.id}</Dialog.Title
			>
			{#if moldingMachineProps.customName}
				<Dialog.Description>
					{moldingMachineProps.id}
				</Dialog.Description>
			{/if}
		</Dialog.Header>
		<div class="grid gap-x-2 gap-y-1 grid-cols-1 lg:grid-cols-2 place-items-stretch divide-y lg:divide-x lg:divide-y-0">
			<div class="grid gap-1 grid-cols-1 place-items-stretch divide-y">
				<div class="p-2">
					<Dialog.Title>Status:</Dialog.Title>
					<Table.Root class="my-2">
						<Table.Body>
							{#each macDataStatus as item, index (item.itemName)}
								<Table.Row class={index % 2 ? '' : 'bg-muted'}>
									<Table.Cell class="font-bold">{item.itemName}</Table.Cell>
									<Table.Cell class="font-mono">{item.itemUnit}</Table.Cell>
									<Table.Cell class="text-right font-mono">{item.itemInfo}</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				</div>
				<div class="p-2">
					<Dialog.Title>Timers:</Dialog.Title>
					<Table.Root class="my-2">
						<Table.Body>
							{#each macDataTimers as item, index (item.itemName)}
								<Table.Row class={index % 2 ? '' : 'bg-muted'}>
									<Table.Cell class="font-bold">{item.itemName}</Table.Cell>
									<Table.Cell class="font-mono">{item.itemUnit}</Table.Cell>
									<Table.Cell class="text-right font-mono">{item.itemInfo}</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				</div>
			</div>
			<div class="order-last p-2">
				<Dialog.Title>Recipe:</Dialog.Title>
				<Table.Root class="my-2">
					<Table.Body>
						{#each macDataItems as item, index (item.itemName)}
							<Table.Row class={index % 2 ? '' : 'bg-muted'}>
								<Table.Cell class="font-bold">{item.itemName}</Table.Cell>
								<Table.Cell class="font-mono">{item.itemUnit}</Table.Cell>
								<Table.Cell class="text-right font-mono">{item.itemInfo}</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</div>
			
		</div>
	</Dialog.Content>
</Dialog.Root>
