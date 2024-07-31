<script lang="ts">
     // TODO: Dashboard Graphs
	import type { PageData } from './$types';

	import { route } from '$lib/ROUTES';

    import * as Form from '$lib/components/ui/form';

	export let data: PageData;
</script>

<h1>Welcome to the Dashboard</h1>
<div>
	<section>
		<h1 class="mb-5 text-2xl">
			Hello <span class="font-bold">{data.loggedInUserName}</span>
			<span>{data.loggedInUserMail}</span>
			<span>{data.loggedInUserRole}</span>
		</h1>
        
		<form method="post" action={route('logout /dashboard')}>
			<Form.Button>Logout</Form.Button>
		</form>
	</section>

	<hr class="my-8" />

	<section class="max-w-md mt-4">
		<header class="flex flex-wrap items-center justify-between gap-3 mb-9">
			<h2 class="text-xl font-bold leading-none">List of all registered users</h2>

			<form method="post" action={route('deleteAllUsers /dashboard')}>
				<Form.Button>Delete all users</Form.Button>
			</form>
		</header>

		<ul class="space-y-4">
			{#each data.allUsers as user}
				<li class="p-2 rounded bg-accent">
					{user.name} - {user.email}
				</li>
			{/each}
		</ul>
	</section>
</div>