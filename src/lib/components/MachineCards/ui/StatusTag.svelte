<script lang="ts">
    import { LL } from '$lib/i18n/i18n-svelte';
    import { onMount } from 'svelte';
    // Props
    let klass: string = '';
	export { klass as class };
    export let isDisconnected: boolean = false;
    export let isAuto: boolean = true;
    
    let states = {
        manual: 'disabled',
        auto: 'enabled'
    }
    function defineState() {
        if (isDisconnected) {
            states.manual = 'disabled';
            states.auto = 'disabled';
        } else if (isAuto) {
            states.manual = 'disabled';
            states.auto = 'enabled';
        } else {
            states.manual = 'enabled';
            states.auto = 'disabled';
        }
    }

    onMount(() => defineState());
    // Watch for changes in props
    $: if (isAuto !== undefined || isDisconnected !== undefined) {
		defineState();
	}
</script>
<div class="hidden opacity-95 text-accent-foreground bg-accent font-mono text-xs uppercase place-content-center md:flex {klass} tag-container" >
    <div class="{states.manual}">
        {$LL.statusTag.manual()}
    </div>
    <div class="{states.auto}">
        {$LL.statusTag.automatic()}
    </div>
</div>
<div class="flex opacity-95 text-accent-foreground bg-accent font-mono text-xs uppercase place-content-center md:hidden {klass} tag-container" >
    <div class="{states.manual}">
        {$LL.statusTag.man()}
    </div>
    <div class="{states.auto}">
        {$LL.statusTag.auto()}
    </div>
</div>

<style>
    .tag-container {
		width: max-content;
        height: fit-content;
		box-shadow: inset 0 0 4px #818181;
		border-radius: 4px;
		align-content: center;
	}
    .enabled {
        box-shadow: 0 0 2px #171717;
        background-color: #fff;
        color: #171717;
        border-radius: 4px;
        margin: 2px;
        padding: 4px;
        height: 100%;
        font-weight: 700;
    }
    .disabled {
        margin: 2px;
        padding: 4px;
        font-weight: 300;
    }
</style>