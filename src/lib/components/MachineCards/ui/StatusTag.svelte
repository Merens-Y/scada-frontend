<script lang="ts">
    import { onMount } from 'svelte';
    // Props
    let klass: string = '';
	export { klass as class };
    export let isDisconnected = false;
    export let isAuto = true;
    
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
        Manual
    </div>
    <div class="{states.auto}">
        Automatic
    </div>
</div>
<div class="flex opacity-95 text-accent-foreground bg-accent font-mono text-xs uppercase place-content-center md:hidden {klass} tag-container" >
    <div class="{states.manual}">
        Man
    </div>
    <div class="{states.auto}">
        Auto
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