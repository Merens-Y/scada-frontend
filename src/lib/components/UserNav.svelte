<script lang="ts">
	// LL is a function that returns a translation function based on the current locale, don't change this!
	import { LL } from '$lib/i18n/i18n-svelte';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	export let acronym = 'PU';
	export let user = { name: 'username', email: 'usermail@example.com' };
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
			<Avatar.Root class="h-8 w-8">
				<Avatar.Fallback>{acronym}</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">{user.name}</p>
				<p class="text-xs leading-none text-muted-foreground">{user.email}</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item>{$LL.userNav.profile()}</DropdownMenu.Item>
			<DropdownMenu.Item>{$LL.userNav.userSettings()}</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item class="bg-destructive text-destructive-foreground">{$LL.userNav.logout()}</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
