<script lang="ts">
	import type { PageData } from './$types';

	import DashboardLayout from '$lib/components/DashboardLayout.svelte';

	export let data: PageData;
	let user = { name: data.loggedInUserName, email: data.loggedInUserMail, role: data.loggedInUserRole };
</script>

<DashboardLayout user={user}>
	<slot />
</DashboardLayout>