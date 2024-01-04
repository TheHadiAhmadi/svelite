<script>
	import { Input } from '$lib/core';
	import Button from '$lib/core/Button/Button.svelte';
	import ButtonGroup from '$lib/core/Button/ButtonGroup.svelte';
	import Card from '$lib/core/Card/Card.svelte';
	import CardBody from '$lib/core/Card/CardBody.svelte';
	import CardHeader from '$lib/core/Card/CardHeader.svelte';
	import FormField from '$lib/core/FormField/FormField.svelte';

	let request = $state({});

	let { data } = $props();
</script>

<Card>
	<form>
		<CardHeader title="Login" />
		<CardBody>
			<FormField label="Username">
				<Input name="username" bind:value={request.username} />
			</FormField>
			<FormField label="Password">
				<Input type="password" name="password" bind:value={request.password} />
			</FormField>
			<ButtonGroup>
				<Button color="primary" class="px-10 ms-auto" size="lg" type="submit">Login</Button>
			</ButtonGroup>
		</CardBody>
	</form>
</Card>
