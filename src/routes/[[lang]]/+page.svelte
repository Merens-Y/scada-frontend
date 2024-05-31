<script lang="ts">
    import PreExpanderMachine from "$lib/components/MachineCards/PreExpanderMachine.svelte";
    import { LL } from '$lib/i18n/i18n-svelte';
</script>

<h1>{$LL.HI({name: "Merens"})}</h1>
<PreExpanderMachine />