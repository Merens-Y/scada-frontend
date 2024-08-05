<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { writable } from 'svelte/store';

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

	type MoldingMachineCycle = {
		cycleID: number;
		cycleNumber: number;
		cycleTime: number;
		cycleTimeStamp: number;
		machineID: string;
		recipeID: string;
		moldID: string;
	};

	const columnHelper = createColumnHelper<MoldingMachineCycle>();
	
	
</script>

