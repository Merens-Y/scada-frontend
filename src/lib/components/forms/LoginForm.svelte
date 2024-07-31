<script lang="ts">
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
			<Form.Label>Email</Form.Label>
			<Input {...attrs} type='email' bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input {...attrs} type='password' bind:value={$formData.password} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>