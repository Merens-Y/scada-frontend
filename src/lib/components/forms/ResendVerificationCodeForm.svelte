<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';

	import * as Form from '$lib/components/ui/form';
	import { toast } from 'svelte-sonner';

	import { route } from '$lib/ROUTES';
	import { enhance } from '$app/forms';
</script>

<form
	method="POST"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'failure') {
				toast.error(result.data?.message);
			}

			if (result.type === 'success') {
				toast.success(result.data?.message);
			}
		};
	}}
	action={route('sendNewCode /auth/email-verification')}
>
	<Form.Button>{$LL.auth.formSubmit()}</Form.Button>
</form>
