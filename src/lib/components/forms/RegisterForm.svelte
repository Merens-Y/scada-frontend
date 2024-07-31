<script lang="ts">
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
			<Form.Label>Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} type='email' bind:value={$formData.email} />
		</Form.Control>
		<Form.Description
			>Email address used for validation and notifications inside the application. It's preferred that you use your company email.</Form.Description
		>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input {...attrs} type='password' bind:value={$formData.password} />
		</Form.Control>
		<Form.Description
			>Ensure the password is at least 8 characters.</Form.Description
		>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
