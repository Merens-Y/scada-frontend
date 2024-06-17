<!-- DOCUMENT: Create appropiate wiki page only after setting proper types and props. -->
<!-- TODO: Add context menu -->
<!-- TODO: Add machine name edit button -->
<!-- TODO: Give better styling to tooltips for each widget -->
<!-- TODO: Add machine serial number to machine name if custom name is not available. Then show it as a subtitle if it is.  -->
<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
    import CyclePerformanceIndicator from './ui/CyclePerformanceIndicator.svelte';
	import MachineHealthBar from './ui/MachineHealthBar.svelte';
    import StatusLed from './ui/StatusLED.svelte';
	import StatusTag from './ui/StatusTag.svelte';
	
	export let moldingMachineProps = {
		id: 'molding001',
		customName: '',
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
		count: 25,
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

<div class="max-w-fit flex-col select-none cursor-default rounded-lg border bg-card text-card-foreground gap-4 m-2 p-4 shadow sm:w-[350px] md:w-[400px] md:shadow-lg lg:w-[450px]">
	<div class="flex w-full gap-x-1 mb-4 h-auto">
		<div class="flex-1 grow text-md uppercase">{moldingMachineProps.customName === '' ? moldingMachineProps.id : moldingMachineProps.customName}</div>
		<StatusTag class="flex-none" {...tagProps} />
		<StatusLed class="flex-none" {...ledProps} />
	</div>
	<MachineHealthBar {...healthBarProps}/>
	<div class="text-xs md:text-sm text-center">{$LL.machineHealthBar.legend()}</div>
	<CyclePerformanceIndicator {...performanceIndicatorProps}/>
	<div class="text-xs md:text-sm text-center">{$LL.performanceIndicator.legend()}</div>
</div>