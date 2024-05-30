<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let count = 25; // Prop for current cycle count
	export let countIdeal = 50; // Prop for ideal cycle count
	export let countMax = 100; // Prop for maximum cycle count

	let style = 'green'; // Default to green

	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	function updateProgress() {
		progress.set(Math.min(Math.max(count / countMax, 0), 1)); // Clamp progress between 0 and 1
		if (count / countMax < countIdeal / countMax) {
			style = 'green';
		} else if (count / countMax < 1) {
			style = 'yellow';
		} else {
			style = 'red';
		}
	}

	onMount(() => updateProgress());

	$: if (count !== undefined || countMax !== undefined || countIdeal !== undefined) {
		updateProgress();
	}
</script>

<progress value={$progress} class="h-1 {style}" />

<style>
	progress {
		display: block;
		width: 100%;
		border-radius: 2px; /* Rounded corners */
		accent-color: #6c6c6c;
		-webkit-appearance: none; /* Remove default appearance */
	}
	progress.green {
		background-color: hsl(120, 33%, 73%); /*Green color for ideal performance */
	}
	progress.yellow {
		background-color: hsl(45, 33%, 73%); /* Yellow color for warning zone */
	}
	progress.red {
		background-color: hsl(0, 33%, 73%); /* Red color for critical zone */
	}
	progress.green::-webkit-progress-bar {
		/* style rules background in chrome, edge, opera */
		background-color: hsl(120, 33%, 73%);
		border-radius: 2px;
	}
	progress.green::-webkit-progress-value {
		/* style rules chrome edge opera value bar colour */
		background-color: hsl(120, 100%, 29%);
		border-radius: 2px;
		transition: width 0.4s ease-in;
	}
	progress.green::-moz-progress-bar {
		/* style rules ff equivalent to ::-webkit-progress-value */
		background-color: hsl(120, 100%, 29%);
		border-radius: 2px;
		transition: width 0.4s ease-in;
	}
	progress.yellow::-webkit-progress-bar {
		/* style rules background in chrome, edge, opera */
		background-color: hsl(45, 33%, 73%);
		border-radius: 2px;
	}
	progress.yellow::-webkit-progress-value {
		/* style rules chrome edge opera value bar colour */
		background-color: hsl(45, 59%, 50%);
		border-radius: 2px;
		transition: width 0.4s ease-in;
	}
	progress.yellow::-moz-progress-bar {
		/* style rules ff equivalent to ::-webkit-progress-value */
		background-color: hsl(45, 59%, 50%);
		border-radius: 2px;
		transition: width 0.4s ease-in;
	}
	progress.red::-webkit-progress-bar {
		/* style rules background in chrome, edge, opera */
		background-color: hsl(0, 33%, 73%);
		border-radius: 2px;
	}
	progress.red::-webkit-progress-value {
		/* style rules chrome edge opera value bar colour */
		background-color: hsl(0, 100%, 29%);
		border-radius: 2px;
		transition: width 0.4s ease-in;
	}
	progress.red::-moz-progress-bar {
		/* style rules ff equivalent to ::-webkit-progress-value */
		background-color: hsl(0, 100%, 29%);
		border-radius: 2px;
		transition: width 0.4s ease-in;
	}
</style>
