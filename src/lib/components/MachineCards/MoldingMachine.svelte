<!-- DOCUMENT: Create appropiate wiki page only after setting proper types and props. -->
<script lang="ts">
    import CyclePerformanceIndicator from './ui/CyclePerformanceIndicator.svelte';
	import MachineHealthBar from './ui/MachineHealthBar.svelte';
    import StatusLed from './ui/StatusLED.svelte';
	import StatusTag from './ui/StatusTag.svelte';
	
	// function that will be called when the button is clicked, it will loop through ledProps and then flip the booleans.
	function randomizeMachineProps() {
		return;
	}

	const ledProps = {
		isRunning: true,
		isDisconnected: false
	};
	const healthBarProps = {
		count: 25,
		countIdeal: 500,
		countMax: 700
	};
</script>

<div class="w-[350px] flex-col rounded-lg border bg-card text-card-foreground gap-4 m-2 p-4 shadow md:w-[400px] md:shadow-lg lg:w-[450px]">
	<div class="flex w-full gap-x-1 mb-4 h-auto">
		<div class="flex-1 grow text-md uppercase">max 12 chars</div>
		<StatusTag class="flex-none" isAuto={false} isDisconnected={false} />
		<StatusLed class="flex-none" {...ledProps} />
	</div>
	<MachineHealthBar {...healthBarProps}/>
	<div class="text-xs md:text-sm">Cycles since maintenance (ideal: {healthBarProps.countIdeal} / max: {healthBarProps.countMax})</div>
	<CyclePerformanceIndicator/>
	<div class="text-xs md:text-sm">Current cycle time / last cycle time</div>
</div>