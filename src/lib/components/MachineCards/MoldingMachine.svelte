<!-- TODO: Set proper sized text and block size depending on screen size. Mobile first, then md and lg -->
<!-- DOCUMENT: Create appropiate wiki page only after setting proper types and props. -->
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

<Card.Root class="w-[350px] m-2 md:m-4 lg:m-6 shadow md:shadow-lg">
	<Card.Header>
		<div class="grid grid-cols-12 gap-1">
			<Card.Title class="col-span-11">machine_serial_number</Card.Title><StatusLed class="col-span-1" {...ledProps} />
		</div>
		<Card.Description>Cycles since maintenance (ideal: {healthBarProps.countIdeal} / max: {healthBarProps.countMax}):</Card.Description>
		<div style="width: 100%;"><MachineHealthBar {...healthBarProps}/></div>
        <Card.Description>Current cycle time / last cycle time:</Card.Description>
		<CyclePerformanceIndicator/>

		<Card.Description>Currently making:</Card.Description>
		<Card.Description>35lbs Top x 6 units</Card.Description>
		<Card.Description>Deploy your new project in one-click.</Card.Description>
	</Card.Header>
	<Card.Content>
		Card Content
	</Card.Content>
	<Card.Footer class="flex justify-between">
		
		<div style="width: 100%;">
			<Button on:click={() => toggleLedProps()} variant="outline">Swap Values</Button>
			<Button on:click={() => toggleHealthBarProps()}>Rand Health</Button>
			<Button on:click={() => toggleLedState()}>Flip State</Button>
		</div>
		
	</Card.Footer>
</Card.Root>
