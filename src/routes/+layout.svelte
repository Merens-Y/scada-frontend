<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import DashboardLayout from '$lib/components/DashboardLayout.svelte';
	import '../app.css';
</script>

<ModeWatcher />

<DashboardLayout >
	<slot />
</DashboardLayout>