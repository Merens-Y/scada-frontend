<script lang="ts">
    import MoldingMachine from "$lib/components/MachineCards/MoldingMachine.svelte";
    import { LL } from '$lib/i18n/i18n-svelte';
</script>

<h1>{$LL.HI({name: "Merens"})}</h1>
<MoldingMachine />