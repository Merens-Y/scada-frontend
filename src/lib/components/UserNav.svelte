<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
			<Avatar.Root class="h-8 w-8">
				<Avatar.Image src="/avatars/01.png" alt="@shadcn" />
				<Avatar.Fallback>PU</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">username</p>
				<p class="text-xs leading-none text-muted-foreground">usermail@example.com</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item>Perfil</DropdownMenu.Item>
			<DropdownMenu.Item>Ajustes de Usuario</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item class="bg-destructive text-destructive-foreground">Cerrar Sesión</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
