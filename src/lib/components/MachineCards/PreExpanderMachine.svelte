<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
    import CyclePerformanceIndicator from './ui/CyclePerformanceIndicator.svelte';
	import MachineHealthBar from './ui/MachineHealthBar.svelte';
    import StatusLed from './ui/StatusLED.svelte';
	
	// function that will be called when the button is clicked, it will loop through ledProps and then flip the booleans.
	function toggleLedProps() {
		ledProps.isRunning = !ledProps.isRunning;
		ledProps.isDisconnected = !ledProps.isDisconnected;
	};

	function toggleLedState() {
		ledProps.isRunning = !ledProps.isRunning;
	};

	function toggleHealthBarProps() {
		healthBarProps.count = Math.floor(Math.random() * 1000);
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
</script>

<Card.Root class="w-[350px]">
	<Card.Header>
		<div class="grid grid-cols-12 gap-1">
			<Card.Title class="col-span-11">machine_serial_number</Card.Title><StatusLed class="col-span-1" {...ledProps} />
		</div>
		<MachineHealthBar {...healthBarProps}></MachineHealthBar>
        <CyclePerformanceIndicator></CyclePerformanceIndicator>
		<Card.Description>Deploy your new project in one-click.</Card.Description>
		<Card.Description>Deploy your new project in one-click.</Card.Description>
		<Card.Description>Deploy your new project in one-click.</Card.Description>
		<Card.Description>Deploy your new project in one-click.</Card.Description>
	</Card.Header>
	<Card.Content>
		Card Content
	</Card.Content>
	<Card.Footer class="flex justify-between">
		<Button on:click={() => toggleLedProps()} variant="outline">Swap Values</Button>
		<Button on:click={() => toggleHealthBarProps()}>Rand Health</Button>
		<Button on:click={() => toggleLedState()}>Flip State</Button>
	</Card.Footer>
</Card.Root>
