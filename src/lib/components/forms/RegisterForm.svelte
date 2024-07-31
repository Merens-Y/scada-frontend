<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';

	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';

    import { route } from '$lib/ROUTES';
	import { RegisterUserZodSchema, type RegisterFormSchema } from '$lib/validations/AuthZodSchemas';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<RegisterFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(RegisterUserZodSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance action={route('registerUser /auth/register')}>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>{$LL.auth.fieldName()}</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.Description>{$LL.auth.fieldDescriptionName()}</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>{$LL.auth.fieldEmail()}</Form.Label>
			<Input {...attrs} type='email' bind:value={$formData.email} />
		</Form.Control>
		<Form.Description
			>{$LL.auth.fieldDescriptionEmail()}</Form.Description
		>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>{$LL.auth.fieldPassword()}</Form.Label>
			<Input {...attrs} type='password' bind:value={$formData.password} />
		</Form.Control>
		<Form.Description
			>{$LL.auth.fieldDescriptionPassword()}</Form.Description
		>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>{$LL.auth.formSubmit()}</Form.Button>
</form>
