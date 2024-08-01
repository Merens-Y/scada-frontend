<script lang="ts">
	import MoldingMachine from '$lib/components/MachineCards/MoldingMachine.svelte';

	let moldMachs = [
		{ id: 1, customName: 'apple' },
		{ id: 2, customName: 'banana' },
		{ id: 3, customName: '' },
		{ id: 4, customName: 'doughnut' },
		{ id: 5, customName: 'egg' }
	];
</script>

<h1>Molding Machines</h1>
<div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 place-items-center">
	{#each moldMachs as moldMac (moldMac.id)}
		<MoldingMachine
			moldingMachineProps={{ id: moldMac.id.toString(), customName: `${moldMac.customName}` }}
		/>
	{/each}
</div>
