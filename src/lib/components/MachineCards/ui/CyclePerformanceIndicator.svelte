<!-- TODO: clean up and setting of props -->
<!-- TODO: adjust tweens and colors to highlight based on props -->
<!-- README:
This indicator measures the performance of a production cycle based on the time it takes to complete a single cycle.

Color Coding:

	Green: The cycle is within the ideal time range.
	Yellow: The cycle is between the ideal and maximum time ranges.
	Red: The cycle is between the maximum time range and 20% above the maximum, indicating that it is performing poorly.

Triangles:

	Dynamic Cycle Time Triangle: Represents the current cycle time.
	Last Cycle Time Triangle: Represents the time it took to complete the previous cycle. This provides a reference point for the current cycle time and allows users to anticipate potential performance issues.
Responsiveness:

The indicator is responsive to the current cycle time (currentTime prop). The visual elements dynamically change to highlight the current performance state.

	Highlighting: Depending on the currentTime prop, the border of the colored area (rect element) where the current cycle time triangle resides will become thicker and gain an inset shadow. This utilizes a brighter variant of the colored area to create a highlighted effect.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let currentTime = 0;
	export let lastTime = 180;
	export let idealTime = 120;
	export let maxTime = 180;

	const triangleHeightBias = 11;
	const barHeight = 10;
	const barRadius = 5;

	// Calculate the percentage that each rect element should be filled with based on the ideal and maximum time props:
	let max20Percent = maxTime * 1.2;
	const idealZonePercentage = (idealTime / max20Percent) * 100;
	const warningZonePercentage = ((maxTime - idealTime) / max20Percent) * 100;
	const criticalZonePercentage = ((max20Percent - maxTime) / max20Percent) * 100;
	// Calculate the percentage at which the triangles should be positioned
	const liveTrianglePosition = (currentTime / max20Percent) * 336;
	const lastTrianglePosition = ((lastTime / max20Percent)) * 336;

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

<div class="p-1 bar-container">
	<svg class="overflow-visible" width="100%" height="20">
		<rect class="ideal green" x="0" y="0" width="{idealZonePercentage}%" height="{barHeight}" fill="#4CAF50" rx="{barRadius}" />
		<rect class="warning yellow" x="{idealZonePercentage}%" y="0" width="{warningZonePercentage}%" height="{barHeight}" fill="#ffc107" rx="{barRadius}" />
		<rect
			class="critical red"
			x="{idealZonePercentage + warningZonePercentage}%"
			y="0"
			width="{criticalZonePercentage}%"
			height="{barHeight}"
			fill="#f44336"
			rx="{barRadius}"
			stroke="#B55"
			stroke-width="2"
		/>
		<polygon
			points="{liveTrianglePosition + 5},{triangleHeightBias + 0}
              {liveTrianglePosition + 0},{triangleHeightBias + 5}
              {liveTrianglePosition + 10},{triangleHeightBias + 5}"
			fill="#FFFA"
			stroke="#666"
		/>
		<polygon
			points="{lastTrianglePosition + 5},{triangleHeightBias + 0}
              {lastTrianglePosition + 0},{triangleHeightBias + 5}
              {lastTrianglePosition + 10},{triangleHeightBias + 5}"
			fill="#666A"
			stroke="#BBB"
		/>
	</svg>
</div>

<style>
	.bar-container {
		display: block;
		width: 100%;
		box-shadow: inset 0 0 4px #c6c6c6;
		background-color: #fff2;
		border-radius: 8px;
		align-content: center;
		height: 20px;
	}
</style>
