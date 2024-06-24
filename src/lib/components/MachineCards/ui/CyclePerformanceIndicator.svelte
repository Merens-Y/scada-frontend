<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { spring } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	import * as Tooltip from '../../ui/tooltip';

	let klass: string = '';
	export { klass as class };

	export let currentTime: number = 155;
	export let lastTime: number = 106;
	export let idealTime: number = 100;
	export let maxTime: number = 180;

	const triangleHeightBias = -6;
	let lastTriangleColor = '#666';
	let colorBorders = {
		ideal: '',
		warning: '',
		critical: ''
	};

	// Calculate the percentage that each rect element should be filled with based on the ideal and maximum time props:
	let max20Percent = maxTime * 1.2;
	let idealZonePercentage = (idealTime / max20Percent) * 100;
	let warningZonePercentage = ((maxTime - idealTime) / max20Percent) * 100;
	let criticalZonePercentage = ((maxTime * 0.2) / max20Percent) * 100;

	const currentProgress = spring(0);
	const lastProgress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	function updateState() {
		currentProgress.set(Math.min((currentTime / max20Percent) * 100, 99));
		lastProgress.set(Math.min((lastTime / max20Percent) * 100, 99));

		if (lastTime <= idealTime) {
			colorBorders.ideal = 'border-2';
			colorBorders.warning = '';
			colorBorders.critical = '';
			lastTriangleColor = '#0F0';
		} else if (lastTime > idealTime && lastTime < maxTime) {
			colorBorders.ideal = '';
			colorBorders.warning = 'border-2';
			colorBorders.critical = '';
			lastTriangleColor = '#EAB308';
		} else {
			colorBorders.ideal = '';
			colorBorders.warning = '';
			colorBorders.critical = 'border-2';
			lastTriangleColor = '#F00';
		};
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

<Tooltip.Root>
	<Tooltip.Trigger asChild let:builder>
		<div class="bar-container px-2 pt-3 pb-1 rounded-lg {klass}" use:builder.action {...builder}>
			<div class="gap-0.5 flex relative">
				<div
					class="bg-lime-500 h-2 flex-auto rounded border-lime-300 {colorBorders.ideal}"
					style="width: {idealZonePercentage}%;"
				></div>
				<div
					class="bg-yellow-500 h-2 flex-auto rounded border-yellow-300 {colorBorders.warning}"
					style="width: {warningZonePercentage}%;"
				></div>
				<div
					class="bg-red-500 h-2 flex-auto rounded border-red-400 {colorBorders.critical}"
					style="width: {criticalZonePercentage}%;"
				></div>
				<div
					class="bg-transparent h-2 w-2 absolute z-10"
					style="left: {$currentProgress}%; top: {triangleHeightBias}px"
				>
					<svg class="overflow-visible" width="100%" height="100%">
						<polygon
							points="-4,0
							  1,5
							  6,0"
							fill="#FFFA"
							stroke="#666"
						/>
					</svg>
				</div>
				<div
					class="bg-transparent h-2 w-2 absolute"
					style="left: {$lastProgress}%; top: {triangleHeightBias}px"
				>
					<svg class="overflow-visible" width="100%" height="100%">
						<polygon
							points="-4,0
							  1,5
							  6,0"
							fill={lastTriangleColor}
							stroke="#666"
						/>
					</svg>
				</div>
			</div>
		</div>
		<div class="text-xs md:text-sm text-center">{$LL.performanceIndicator.legend()}</div>
	</Tooltip.Trigger>
	<Tooltip.Content class='bg-muted/75' side="top">
		<div class="flex text-xs divide-x-4 divide-dotted divide-slate-800/25 dark:divide-slate-50/25">
			<div class="p-1">{$LL.performanceIndicator.currentTime()}: {currentTime}s</div>
			<div class="p-1">{$LL.performanceIndicator.lastTime()}: {lastTime}s</div>
			<div class="p-1">{$LL.performanceIndicator.idealTime()}: {idealTime}s</div>
			<div class="p-1">{$LL.performanceIndicator.maximumTime()}: {maxTime}s</div>
		</div>
	</Tooltip.Content>
</Tooltip.Root>

<style>
	.bar-container {
		box-shadow: inset 0 0 4px #c6c6c6;
		background-color: #fff2;
	}
</style>
