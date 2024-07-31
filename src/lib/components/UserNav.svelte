<script lang="ts">
	import { route } from '$lib/ROUTES';
	// LL is a function that returns a translation function based on the current locale, don't change this!
	import { LL } from '$lib/i18n/i18n-svelte';

	import CircleUser from 'lucide-svelte/icons/circle-user';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Form from '$lib/components/ui/form';
	import { Badge } from '$lib/components/ui/badge/index.js';

	export let name = 'username';
	export let email = 'usermail@example.com';
	export let role = 'default';
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
				<p class="text-sm font-medium leading-none">{name} <Badge variant='destructive'>{role}</Badge></p>
				<p class="text-xs leading-none text-muted-foreground">{email}</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>{$LL.userNav.profile()}</DropdownMenu.Item>
		<DropdownMenu.Item>{$LL.userNav.userSettings()}</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>
			<form method="post" action={route('logout /dashboard')}>
				<Form.Button variant="destructive" class="w-full">{$LL.userNav.logout()}</Form.Button>
			</form>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
