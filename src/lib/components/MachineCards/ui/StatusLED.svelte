<script lang="ts">
	import { onMount } from 'svelte';
	// Props
	let klass: string = '';
	export { klass as class };
	export let isRunning: boolean = false;
	export let isDisconnected: boolean = true;
	// State Management
	let state = 'disconnected'; // Default to disconnected state

	function updateState() {
		if (isDisconnected) {
			state = 'disconnected';
		} else if (isRunning) {
			state = 'running';
		} else {
			state = 'stopped';
		}
	}
	onMount(() => updateState());
	// Watch for changes in props
	$: if (isRunning !== undefined || isDisconnected !== undefined) {
		updateState();
	}
</script>

<div class="led-container rounded-sm w-5 h-7 p-1 place-content-center md:rounded md:w-7 md:h-7 {klass}"><div class="status-led rounded-sm md:rounded {state}"></div></div>

<style>
	.led-container {
		box-shadow: inset 0 0 4px #c6c6c6;
		background-color: #fff2;
		align-content: center;
	}

	.status-led {
		/* Base styles for all states (e.g., size, border-radius) */
		height: 100%;
		width: 100%;
		/* border-radius: 4px; */
	}

	.status-led.running {
		background-color: rgb(0, 255, 0);
		animation: pulsegreen 1s ease infinite; /* Animate size for pulsating effect */
		box-shadow:
			0 0 16px rgb(0, 255, 0),
			inset 0 0 8px rgb(0, 118, 0);
	}

	.status-led.stopped {
		background-color: #ef4444;
		box-shadow:
			0 0 16px #ef4444,
			inset 0 0 8px #7b1616;
	}

	.status-led.disconnected {
		background-color: #cacaca;
		box-shadow:
			0 0 4px rgba(184, 184, 184, 0.83),
			inset 0 0 16px #4a4a4a;
	}

	/* Animation for pulsating green LED */

	@-webkit-keyframes pulsegreen {
		0% {
			box-shadow:
				0 0 8px rgb(0, 255, 0),
				inset 0 0 8px rgb(0, 118, 0);
		}

		50% {
			box-shadow:
				0 0 24px rgb(0, 255, 0),
				inset 0 0 2px rgb(0, 118, 0);
		}

		100% {
			box-shadow:
				0 0 8px rgb(0, 255, 0),
				inset 0 0 8px rgb(0, 118, 0);
		}
	}
	/* if webkit is not supported, use standard keyframes */
	@keyframes pulsegreen {
		0% {
			box-shadow:
				0 0 0px rgb(0, 255, 0),
				inset 0 0 8px rgb(0, 118, 0);
		}

		50% {
			box-shadow:
				0 0 24px rgb(0, 255, 0),
				inset 0 0 2px rgb(0, 118, 0);
		}

		100% {
			box-shadow:
				0 0 0px rgb(0, 255, 0),
				inset 0 0 8px rgb(0, 118, 0);
		}
	}
</style>
