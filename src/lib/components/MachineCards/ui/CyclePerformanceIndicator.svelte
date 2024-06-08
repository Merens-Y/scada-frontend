<!-- TODO: apply better colors for dark mode -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let triangleHeightBias = 11;

	let barHeight = 10;
	let barRadius = 5;

	let currentTime = 0; // Prop for current cycle time
	let lastTime = 0; // Prop for last cycle time
	let idealTime = 120; // Prop for ideal cycle time
	let maxTime = 180; // Prop for maximum cycle time

	// Calculate fixed positions for bars based on props
	const idealWidth = (idealTime / maxTime) * 100;
	const warningWidth = ((maxTime - idealTime) / maxTime) * 100;
	const criticalWidth = ((currentTime - maxTime) / maxTime) * 100;

	const idealWidthF = 50;
	const warningWidthF = 20;
	const criticalWidthF = 30;

	// Fixed positions for arrows (can be adjusted)
	const currentArrowPos = 80;
	const lastArrowPos = 20;

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
		<rect x="0" y="0" width="{idealWidthF}%" height="{barHeight}" fill="#4CAF50" rx="{barRadius}" />
		<rect x="{idealWidthF}%" y="0" width="{warningWidthF}%" height="{barHeight}" fill="#ffc107" rx="{barRadius}" />
		<rect
			x="{idealWidthF + warningWidthF}%"
			y="0"
			width="{criticalWidthF}%"
			height="{barHeight}"
			fill="#f44336"
			rx="{barRadius}"
		/>
		<polygon
			points="{lastArrowPos + 5},{triangleHeightBias + 0}
              {lastArrowPos + 0},{triangleHeightBias + 5}
              {lastArrowPos + 10},{triangleHeightBias + 5}"
			fill="#666A"
			stroke="#000A"
		/>
		<polygon
			points="{currentArrowPos + 5},{triangleHeightBias + 0}
              {currentArrowPos + 0},{triangleHeightBias + 5}
              {currentArrowPos + 10},{triangleHeightBias + 5}"
			fill="#FFFA"
			stroke="#000A"
		/>
	</svg>
</div>

<style>
	.bar-container {
		display: block;
		width: 100%;
		box-shadow: inset 0 0 4px #fff;
		background-color: #aaa;
		border-radius: 8px;
		padding: 5px;
		align-content: center;
		height: 20px;
	}
</style>
