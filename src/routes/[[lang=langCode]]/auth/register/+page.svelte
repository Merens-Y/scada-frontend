<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';

	import RegisterForm from '$lib/components/forms/RegisterForm.svelte';
	import { Button } from '$lib/components/ui/button';

	import type { PageData } from './$types.js';
	import { route } from '$lib/ROUTES';

	export let data: PageData;
</script>

<div
	class="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<Button
		href="{route('/auth/login')}"
		variant="secondary"
		class="absolute right-4 top-4 md:right-8 md:top-8"
	>
		{$LL.auth.login()}
	</Button>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">{$LL.auth.register()}</h1>
				<p class="text-muted-foreground text-sm">{$LL.auth.registerInstructions()}</p>
			</div>
			<RegisterForm data={data.form} />
		</div>
	</div>
</div>
