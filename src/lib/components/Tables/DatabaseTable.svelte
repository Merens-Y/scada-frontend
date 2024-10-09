<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { writable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';

	import {
		createColumnHelper,
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getSortedRowModel,
		getFilteredRowModel,
		getPaginationRowModel
	} from '@tanstack/svelte-table';

	import type {
		ColumnDef,
		TableOptions,
		FilterFn,
		OnChangeFn,
		ColumnOrderState,
		ColumnPinningState,
		VisibilityState
	} from '@tanstack/svelte-table';

	import { rankItem } from '@tanstack/match-sorter-utils';
	import { Column } from 'drizzle-orm';
	// import { info } from 'console';

	type MoldingMachineRecipe = {
		recipeID: string;
		steamFixed: number;
		steamMoving: number;
		drainFixed: number;
		drainMoving: number;
		pressureFixed: number;
		pressureMoving: number;
		waterFixed: number;
		waterMoving: number;
		vacuumCooling: number;
	};
	type MoldingMachineMold = {
		moldID: string;
		moldName: string;
		moldType: string;
		moldProductionQuantity: number;
		idealCycleTime: number;
		maxCycleTime: number;
		idealCycleCount: number;
		maxCycleCount: number;
	};
	type MoldingMachineCycle = {
		cycleID: number;
		cycleNumber: number;
		cycleTime: number;
		cycleTimeStamp: number;
		machineID: number;
		machineSN: string;
		recipe: MoldingMachineRecipe;
		mold: MoldingMachineMold;
	};
	// Array of objects of type MoldingMachineCycle.
	const moldingMachineCycles: MoldingMachineCycle[] = [
		{
			cycleID: 1,
			cycleNumber: 1,
			cycleTime: 60,
			cycleTimeStamp: 1693832000, // Replace with actual timestamp
			machineID: 1,
			machineSN: 'P00123',
			recipe: {
				recipeID: 'recipeA',
				steamFixed: 100,
				steamMoving: 50,
				drainFixed: 80,
				drainMoving: 40,
				pressureFixed: 150,
				pressureMoving: 75,
				waterFixed: 120,
				waterMoving: 60,
				vacuumCooling: 30
			},
			mold: {
				moldID: '002',
				moldName: '20 lb',
				moldType: 'Top',
				moldProductionQuantity: 100,
				idealCycleTime: 60,
				maxCycleTime: 75,
				idealCycleCount: 500,
				maxCycleCount: 600
			}
		},
		{
			cycleID: 2,
			cycleNumber: 2,
			cycleTime: 65,
			cycleTimeStamp: 1693832600, // Replace with actual timestamp
			machineID: 2,
			machineSN: 'P00124',
			recipe: {
				recipeID: 'recipeB',
				steamFixed: 90,
				steamMoving: 45,
				drainFixed: 75,
				drainMoving: 35,
				pressureFixed: 140,
				pressureMoving: 70,
				waterFixed: 110,
				waterMoving: 55,
				vacuumCooling: 25
			},
			mold: {
				moldID: '001',
				moldName: '35 lb',
				moldType: 'Full',
				moldProductionQuantity: 120,
				idealCycleTime: 65,
				maxCycleTime: 80,
				idealCycleCount: 450,
				maxCycleCount: 550
			}
		},
		{
			cycleID: 3,
			cycleNumber: 3,
			cycleTime: 70,
			cycleTimeStamp: 1693833200, // Replace with actual timestamp
			machineID: 3,
			machineSN: 'P00125',
			recipe: {
				recipeID: 'recipeC',
				steamFixed: 110,
				steamMoving: 55,
				drainFixed: 85,
				drainMoving: 45,
				pressureFixed: 160,
				pressureMoving: 80,
				waterFixed: 130,
				waterMoving: 65,
				vacuumCooling: 35
			},
			mold: {
				moldID: '003',
				moldName: '70 lb',
				moldType: 'Bottom',
				moldProductionQuantity: 90,
				idealCycleTime: 70,
				maxCycleTime: 85,
				idealCycleCount: 400,
				maxCycleCount: 500
			}
		}
	];

	const defaultColumns: ColumnDef<MoldingMachineCycle>[] = [
		{
			header: 'Cycle Data',
			columns: [
				{
					accessorKey: 'cycleID',
					cell: (info) => info.getValue(),
					header: () => 'Cycle ID'
				},
				{
					accessorKey: 'cycleTimeStamp',
					cell: (info) => info.getValue(),
					header: () => 'Cycle Timestamp'
				},
				{
					accessorKey: 'machineSN',
					cell: (info) => info.getValue(),
					header: () => 'Machine Serial Number'
				},
				{
					accessorKey: 'cycleTime',
					cell: (info) => info.getValue(),
					header: () => 'Cycle Time'
				}
			]
		},
		{
			header: 'Recipe Data',
			columns: [
				{
					accessorKey: 'recipe.recipeID',
					cell: (info) => info.getValue(),
					header: () => 'Recipe ID'
				},
				{
					accessorKey: 'recipe.steamFixed',
					cell: (info) => info.getValue(),
					header: () => 'Steam Fixed'
				},
				{
					accessorKey: 'recipe.steamMoving',
					cell: (info) => info.getValue(),
					header: () => 'Steam Moving'
				},
				{
					accessorKey: 'recipe.drainFixed',
					cell: (info) => info.getValue(),
					header: () => 'Drain Fixed'
				},
				{
					accessorKey: 'recipe.drainMoving',
					cell: (info) => info.getValue(),
					header: () => 'Drain Moving'
				},
				{
					accessorKey: 'recipe.pressureFixed',
					cell: (info) => info.getValue(),
					header: () => 'Pressure Fixed'
				},
				{
					accessorKey: 'recipe.pressureMoving',
					cell: (info) => info.getValue(),
					header: () => 'Pressure Moving'
				},
				{
					accessorKey: 'recipe.waterFixed',
					cell: (info) => info.getValue(),
					header: () => 'Water Fixed'
				},
				{
					accessorKey: 'recipe.waterMoving',
					cell: (info) => info.getValue(),
					header: () => 'Water Moving'
				},
				{
					accessorKey: 'recipe.vacuumCooling',
					cell: (info) => info.getValue(),
					header: () => 'Vacuum Cooling'
				}
			]
		},
		{
			header: 'Mold Data',
			columns: [
				{
					accessorKey: 'mold.moldID',
					cell: (info) => info.getValue(),
					header: () => 'Mold ID'
				},
				{
					accessorKey: 'mold.moldName',
					cell: (info) => info.getValue(),
					header: () => 'Mold Name'
				},
				{
					accessorKey: 'mold.moldType',
					cell: (info) => info.getValue(),
					header: () => 'Mold Type'
				},
				{
					accessorKey: 'mold.moldProductionQuantity',
					cell: (info) => info.getValue(),
					header: () => 'Mold Production Quantity'
				},
				{
					accessorKey: 'mold.idealCycleTime',
					cell: (info) => info.getValue(),
					header: () => 'Ideal Cycle Time'
				},
				{
					accessorKey: 'mold.maxCycleTime',
					cell: (info) => info.getValue(),
					header: () => 'Max Cycle Time'
				},
				{
					accessorKey: 'mold.idealCycleCount',
					cell: (info) => info.getValue(),
					header: () => 'Ideal Cycle Count'
				},
				{
					accessorKey: 'mold.maxCycleCount',
					cell: (info) => info.getValue(),
					header: () => 'Max Cycle Count'
				}
			]
		}
	];

	let columnOrder: ColumnOrderState = [];
	const setColumnOrder: OnChangeFn<ColumnOrderState> = (updater) => {
		if (updater instanceof Function) {
			columnOrder = updater(columnOrder);
		} else {
			columnOrder = updater;
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				columnOrder
			}
		}));
	};

	let columnVisibility: VisibilityState = {};
	const setColumnVisibility: OnChangeFn<VisibilityState> = (updater) => {
		if (updater instanceof Function) {
			columnVisibility = updater(columnVisibility);
		} else {
			columnVisibility = updater;
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				columnVisibility
			}
		}));
	};

	let columnPinning: ColumnPinningState = {};
	const setColumnPinning: OnChangeFn<ColumnPinningState> = (updater) => {
		if (updater instanceof Function) {
			columnPinning = updater(columnPinning);
		} else {
			columnPinning = updater;
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				columnPinning
			}
		}));
	};

	const options = writable<TableOptions<MoldingMachineCycle>>({
		data: moldingMachineCycles,
		columns: defaultColumns,
		state: {
			columnOrder,
			columnVisibility
		},
		onColumnOrderChange: setColumnOrder,
		onColumnVisibilityChange: setColumnVisibility,
		onColumnPinningChange: setColumnPinning,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true
	});

	const rerender = () => {
		options.update((options) => ({
			...options,
			data: moldingMachineCycles
		}));
	};
	const table = createSvelteTable(options);
	// $: stringTable = JSON.stringify($table.getHeaderGroups());
</script>

<!-- {$table.getAllColumns().map(d => d.id)} -->
{console.log($table.getState())}
<div class="inline-block border border-black shadow rounded">
	<div class="px-1 border-b border-black">
		<label>
			<input
				checked={$table.getIsAllColumnsVisible()}
				on:change={(e) => {
					console.info($table.getToggleAllColumnsVisibilityHandler()(e));
				}}
				type="checkbox"
			/>{' '}
			Toggle All
		</label>
	</div>
	{#each $table.getAllColumns() as column}
		<div class="px-1">
			<label>
				<input
					checked={column.getIsVisible()}
					on:change={column.getToggleVisibilityHandler()}
					type="checkbox"
				/>{' '}
				{column.id}
			</label>
		</div>
	{/each}
</div>

<br />

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head></Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		<Table.Row>
			<Table.Cell class="text-xs font-mono"></Table.Cell>
		</Table.Row>
	</Table.Body>
</Table.Root>

<!-- special table for small devices -->
<Table.Root class="md:hidden">
	<Table.Header></Table.Header>
	<Table.Body></Table.Body>
</Table.Root>
<div class="p-2">
	<div class="h-4" />
	<Button on:click={() => rerender()} class="border p-2">Rerender</Button>
</div>
