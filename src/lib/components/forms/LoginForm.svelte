<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';

	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';

    import { route } from '$lib/ROUTES';
	
	import { UserLoginZodSchema, type LoginFormSchema } from '$lib/validations/AuthZodSchemas';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<LoginFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(UserLoginZodSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance action={route('logInUser /auth/login')}>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>{$LL.auth.fieldEmail()}</Form.Label>
			<Input {...attrs} type='email' bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>{$LL.auth.fieldPassword()}</Form.Label>
			<Input {...attrs} type='password' bind:value={$formData.password} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>{$LL.auth.formSubmit()}</Form.Button>
</form>