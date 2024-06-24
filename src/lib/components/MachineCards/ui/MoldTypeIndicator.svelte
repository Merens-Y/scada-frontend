<script lang="ts">
	type MoldTypeStates = 'top' | 'bottom' | 'full';
    let klass: string = '';

	export { klass as class };
	export let moldType: MoldTypeStates;

	const disabledStyles = {
		light: {
			fill:'#fff7e6',
			stroke:'#ffe6b3',
		},
		dark: {
			fill:'#2a3c3c',
			stroke:'#3f5a5a',
		}
	};
	const activeStyles = {
		light: {
			fill:'#cc8800',
			stroke:'#ffaa00',
		},
		dark: {
			fill:'#669999',
			stroke:'#e1eaea',
		}
	};
</script>
<div class="flex">
	<div class="flex-1"></div>
	<!-- Light Mode -->
	<svg
		class="dark:hidden {klass}"
		width="463.39062"
		height="368.71484"
		viewBox="0 0 463.39062 368.71484"
		version="1.1"
		id="svg1"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs id="defs1" />
		<g id="mold" transform="translate(-18.068359,-65.09375)">
			<path
				id="moldtop"
				style="display:inline;{moldType==='bottom' ? `fill:${disabledStyles.light.fill};stroke:${disabledStyles.light.stroke};stroke-width:10;` : `fill:${activeStyles.light.fill};stroke:${activeStyles.light.stroke};stroke-width:15;`}stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:58.7;stroke-dasharray:none;stroke-opacity:1"
				d="m 78.902344,72.59375 c -29.546494,0 -53.333985,23.787496 -53.333985,53.33398 v 61.21094 h 38.25 L 96.978516,156.4668 H 403.02539 l 32.65625,30.20703 h 38.27734 v -60.7461 c 0,-29.546484 -23.78749,-53.33398 -53.33398,-53.33398 z"
			/>
			<path
				id="moldbottom"
				style="display:inline;{moldType==='top' ? `fill:${disabledStyles.light.fill};stroke:${disabledStyles.light.stroke};stroke-width:10;` : `fill:${activeStyles.light.fill};stroke:${activeStyles.light.stroke};stroke-width:15;`}stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:58.7;stroke-dasharray:none;stroke-opacity:1"
				d="M 95.304688,201.69922 64.990234,229.73633 H 25.568359 v 143.24023 c 0,29.54649 23.787491,53.33203 53.333985,53.33203 H 420.625 c 29.54649,0 53.33398,-23.78554 53.33398,-53.33203 V 232.99023 H 438.5293 l -33.83008,-31.29101 z"
			/>
		</g>
	</svg>
	<!-- Dark Mode -->
	<svg
		class="hidden dark:block {klass}"
		width="463.39062"
		height="368.71484"
		viewBox="0 0 463.39062 368.71484"
		version="1.1"
		id="svg1"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs id="defs1" />
		<g id="mold" transform="translate(-18.068359,-65.09375)">
			<path
				id="moldtop"
				style="display:inline;{moldType==='bottom' ? `fill:${disabledStyles.dark.fill};stroke:${disabledStyles.dark.stroke};stroke-width:10;` : `fill:${activeStyles.dark.fill};stroke:${activeStyles.dark.stroke};stroke-width:15;`}stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:58.7;stroke-dasharray:none;stroke-opacity:1"
				d="m 78.902344,72.59375 c -29.546494,0 -53.333985,23.787496 -53.333985,53.33398 v 61.21094 h 38.25 L 96.978516,156.4668 H 403.02539 l 32.65625,30.20703 h 38.27734 v -60.7461 c 0,-29.546484 -23.78749,-53.33398 -53.33398,-53.33398 z"
			/>
			<path
				id="moldbottom"
				style="display:inline;{moldType==='top' ? `fill:${disabledStyles.dark.fill};stroke:${disabledStyles.dark.stroke};stroke-width:10;` : `fill:${activeStyles.dark.fill};stroke:${activeStyles.dark.stroke};stroke-width:15;`}stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:58.7;stroke-dasharray:none;stroke-opacity:1"
				d="M 95.304688,201.69922 64.990234,229.73633 H 25.568359 v 143.24023 c 0,29.54649 23.787491,53.33203 53.333985,53.33203 H 420.625 c 29.54649,0 53.33398,-23.78554 53.33398,-53.33203 V 232.99023 H 438.5293 l -33.83008,-31.29101 z"
			/>
		</g>
	</svg>
	<div class="flex-1"></div>
</div>
<div class="text-center">
	{#if moldType === 'bottom'}
		<p>Bottom</p>
	{:else if moldType === 'top'}
		<p>Top</p>
	{:else}
		<p>Top + Bottom</p>
	{/if}
</div>