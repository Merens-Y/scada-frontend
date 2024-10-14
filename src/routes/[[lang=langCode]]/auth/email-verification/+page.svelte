<script lang="ts">
    import { LL } from '$lib/i18n/i18n-svelte';
    import EmailVerificationForm from '$lib/components/forms/EmailVerificationForm.svelte';
	import ResendVerificationCodeForm from '$lib/components/forms/ResendVerificationCodeForm.svelte';
    import { Button } from '$lib/components/ui/button';

    import type { PageData } from './$types.js';
    import { route } from '$lib/ROUTES';

export let data: PageData;
</script>

<div
	class="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">{$LL.auth.verification()}</h1>
				<p class="text-muted-foreground text-sm">
					{$LL.auth.verificationInstructions()}
				</p>
                <strong>{data.pendingUserEmail}</strong>.
			</div>
			<EmailVerificationForm data={data.emailVerificationCodeFormData} />
			<ResendVerificationCodeForm />
		</div>
	</div>
</div>