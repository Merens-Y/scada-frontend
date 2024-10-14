<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';

	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';

	import { route } from '$lib/ROUTES';

	import {
		EmailVerificationCodeZodSchema,
		type EmailVerificationCodeSchema
	} from '$lib/validations/AuthZodSchemas';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<EmailVerificationCodeSchema>>;

	const form = superForm(data, {
		validators: zodClient(EmailVerificationCodeZodSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance action={route('verifyCode /auth/email-verification')}>
	<Form.Field {form} name="verificationCode">
		<Form.Control let:attrs>
			<Form.Label>{$LL.auth.fieldVerificationCode()}</Form.Label>
			<Input {...attrs} type='verificationCode' bind:value={$formData.verificationCode} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>{$LL.auth.formSubmit()}</Form.Button>
</form>