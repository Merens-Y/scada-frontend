<!-- TODO: adjust tweens and colors to highlight based on props -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let klass: string = '';
	export { klass as class };

	export let currentTime = 0;
	export let lastTime = 180;
	export let idealTime = 100;
	export let maxTime = 180;

	const triangleHeightBias = 4;

	// Calculate the percentage that each rect element should be filled with based on the ideal and maximum time props:
	let max20Percent = maxTime * 1.2;
	let idealZonePercentage = Math.round((idealTime / max20Percent) * 100);
	let warningZonePercentage = Math.round(((maxTime - idealTime) / max20Percent) * 100);
	let criticalZonePercentage = Math.round(((max20Percent - maxTime) / max20Percent) * 100);
	
	const currentProgress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
	const lastProgress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	function updateState() {
		currentProgress.set(Math.min((currentTime / max20Percent) * 100, 96));
		lastProgress.set(Math.min(((lastTime / max20Percent)) * 100, 96));
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

<div class="bar-container px-1 gap-0.5 pt-3 pb-1 flex relative rounded-lg {klass}">
	<div class="bg-lime-500 h-2 flex-auto rounded" style="width: {idealZonePercentage}px;"></div>
	<div class="bg-yellow-500 h-2 flex-auto rounded" style="width: {warningZonePercentage}px;"></div>
	<div class="bg-red-500 h-2 flex-auto rounded" style="width: {criticalZonePercentage}px;"></div>
	<div class="bg-transparent h-2 w-2 absolute" style="left: {$currentProgress}%; top: {triangleHeightBias}px">
		<svg class="overflow-visible" width="100%" height="100%">
			<polygon
				points="0,0
				  		5,5
				  		10,0"
				fill="#FFFA"
				stroke="#666"
			/>
		</svg>
	</div>
	<div class="bg-transparent h-2 w-2 absolute" style="left: {$lastProgress}%; top: {triangleHeightBias}px">
		<svg class="overflow-visible" width="100%" height="100%">
			<polygon
				points="0,0
				  		5,5
				  		10,0"
				fill="#666"
				stroke="#FFFA"
			/>
		</svg>
	</div>
</div>

<style>
	.bar-container {
		box-shadow: inset 0 0 4px #c6c6c6;
		background-color: #fff2;
	}
</style>
