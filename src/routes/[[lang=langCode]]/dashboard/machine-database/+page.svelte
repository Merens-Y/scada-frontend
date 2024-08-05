<script lang="ts">
    import type { PageData } from './$types';
    import DatabaseTable from '$lib/components/Tables/DatabaseTable.svelte';
    
    export let data: PageData;
</script>
<h1>Machine Database</h1>
<DatabaseTable/>