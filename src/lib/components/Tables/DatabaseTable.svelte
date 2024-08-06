<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { writable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button'

	import {
		createColumnHelper,
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getFilteredRowModel,
		getPaginationRowModel
	} from '@tanstack/svelte-table';

	import type { ColumnDef, TableOptions, FilterFn } from '@tanstack/svelte-table';

	import { rankItem } from '@tanstack/match-sorter-utils';
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
		name: string;
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
				moldID: 'moldX',
				name: 'Mold X',
				moldType: 'injection',
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
				moldID: 'moldY',
				name: 'Mold Y',
				moldType: 'compression',
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
				moldID: 'moldZ',
				name: 'Mold Z',
				moldType: 'roto',
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
			accessorKey: 'cycleID',
			cell: (info) => info.getValue(),
			header: () => 'Cycle ID'
		},
		{
			accessorKey: 'cycleNumber',
			cell: (info) => info.getValue(),
			header: () => 'Cycle Number'
		},
		{
			accessorKey: 'cycleTime',
			cell: (info) => info.getValue(),
			header: () => 'Cycle Time'
		},
		{
			accessorKey: 'cycleTimeStamp',
			cell: (info) => info.getValue(),
			header: () => 'Cycle Timestamp'
		},
		{
			accessorKey: 'machineID',
			cell: (info) => info.getValue(),
			header: () => 'Machine ID'
		},
		{
			accessorKey: 'machineSN',
			cell: (info) => info.getValue(),
			header: () => 'Machine Serial Number'
		}
	];

	const options = writable<TableOptions<MoldingMachineCycle>>({
		data: moldingMachineCycles,
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel()
	});

	const rerender = () => {
		options.update((options) => ({
			...options,
			data: moldingMachineCycles
		}));
	};

	const table = createSvelteTable(options);
</script>

<Table.Root>
	<Table.Caption>A list of cycles with its cycle metadata, machine data and recipe data.</Table.Caption>
	<Table.Header>
		{#each $table.getHeaderGroups() as headerGroup}
			<Table.Row>
				{#each headerGroup.headers as header}
					<Table.Head>
						{#if !header.isPlaceholder}
							<svelte:component
								this={flexRender(header.column.columnDef.header, header.getContext())}
							/>
						{/if}
					</Table.Head>
				{/each}
			</Table.Row>
		{/each}
	</Table.Header>
	<Table.Body>
		{#each $table.getRowModel().rows as row}
			<Table.Row>
				{#each row.getVisibleCells() as cell}
					<Table.Cell class='text-xs font-mono'>
						<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
					</Table.Cell>
				{/each}
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
<div class="p-2">
	<div class="h-4" />
	<Button on:click={() => rerender()} class="border p-2"> Rerender </Button>
</div>
