<script lang="ts">
	import SidebarNav from "$lib/components/SidebarNav.svelte";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import { route } from "$lib/ROUTES";

	const sidebarNavItems = [
		{
			title: "Profile",
			href: route("/dashboard/configuration"),
		},
		{
			title: "Account",
			href: route("/dashboard/configuration/account"),
		},
		{
			title: "Appearance",
			href: route("/dashboard/configuration/appearance"),
		},
		{
			title: "Notifications",
			href: route("/dashboard/configuration/notifications"),
		},
	];
</script>

<div class=" space-y-6 p-10 pb-16 ">
	<div class="space-y-0.5">
		<h2 class="text-2xl font-bold tracking-tight">Settings</h2>
		<p class="text-muted-foreground">
			Manage your account settings and set e-mail preferences.
		</p>
	</div>
	<Separator class="my-6" />
	<div class="flex flex-col space-y-4 md:space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
		<aside class="-mx-4 lg:w-1/5">
			<SidebarNav items={sidebarNavItems} />
		</aside>
		<div class="flex-1 lg:max-w-2xl">
			<slot />
		</div>
	</div>
</div>