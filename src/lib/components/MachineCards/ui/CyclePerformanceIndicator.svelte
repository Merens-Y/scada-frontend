<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	// Props for the component
	export let currentTime = 0;
	export let lastTime = 0;
	export let idealTime = 120;
	export let maxTime = 180;

	const currentProgress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
	const lastProgress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	function updateState() {
		currentProgress.set(Math.min(currentTime / maxTime, 1));
		lastProgress.set(Math.min(lastTime / maxTime, 1));
	}
	onMount(() => updateState());
	// Watch for changes in props
	$: if (
		currentTime !== undefined ||
		lastTime !== undefined ||
		idealTime !== undefined ||
		maxTime !== undefined
	) {
		updateState();
	}
</script>

<div class="bar-container">
	<svg width="100%" height="20">
		<rect x="0" y="0" width="{(idealTime / maxTime) * 100}%" height="20" fill="#4CAF50" />
		<rect
			x="{(idealTime / maxTime) * 100}%"
			y="0"
			width="{((maxTime - idealTime) / maxTime) * 100}%"
			height="20"
			fill="#ffc107"
		/>
		<rect
			x="{(maxTime / maxTime) * 100}%"
			y="0"
			width="{((currentTime - maxTime) / maxTime) * 100}%"
			height="20"
			fill="#f44336"
		/>

		<polygon
			points="{$currentProgress * 100}%,0 
				{$currentProgress * 100}%,10 
				{$currentProgress * 100 + 5}%,5"
			fill="#000"
			transform={`translate(${$currentProgress * 100}%, 0)`}
		/>

		<polygon
			points="0,0 
				0,10 
				5,5"
			fill="#999"
			transform={`translate(${$lastProgress * 100}%, 0)`}
		/>
	</svg>
</div>

<style>
	.bar-container {
		display: block;
		width: 100%;
	}
</style>
