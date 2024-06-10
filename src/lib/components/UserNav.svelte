<script lang="ts">
	// LL is a function that returns a translation function based on the current locale, don't change this!
	import { LL } from '$lib/i18n/i18n-svelte';

	import CircleUser from 'lucide-svelte/icons/circle-user';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	
	export let user = { name: 'username', email: 'usermail@example.com' };
</script>
<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="secondary" size="icon" class="rounded-full">
			<CircleUser class="h-5 w-5" />
			<span class="sr-only">{$LL.userNav.toggleSpan()}</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">{user.name}</p>
				<p class="text-xs leading-none text-muted-foreground">{user.email}</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>{$LL.userNav.profile()}</DropdownMenu.Item>
		<DropdownMenu.Item>{$LL.userNav.userSettings()}</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>{$LL.userNav.logout()}</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
