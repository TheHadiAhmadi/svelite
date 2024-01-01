<script lang="ts">
	import { goto } from '$app/navigation';
	import api from '$lib/api';
	import Button from '$lib/core/Button/Button.svelte';
	import Card from '$lib/core/Card/Card.svelte';
	import CardBody from '$lib/core/Card/CardBody.svelte';
	import FormField from '$lib/core/FormField/FormField.svelte';
	import Input from '$lib/core/Input/Input.svelte';
	import Select from '$lib/core/Select/Select.svelte';
	import Switch from '$lib/core/Switch/Switch.svelte';
	import { onMount } from 'svelte';
	import AppFormField from './AppFormField.svelte';

	let { load, fields, onsubmit, actions, params, ...rest } = $props();

	let value: any = $state({});

	onMount(() => {
		if (load) {
			const [collection, field, operator, key] = load.split(':');
			api
				.db(collection)
				.find()
				.filter(field, operator, params[key])
				.first()
				.then((res) => {
					console.log(res);
					value = res.data;
				});
		}
	});

	async function onSubmit(e) {
		e.preventDefault();

		if (onsubmit) {
			const [collection, action] = onsubmit.split(':');
			const res = await api.db(collection)[action](value);

			goto('.');
		}
	}
</script>

<form onsubmit={onSubmit}>
	<Card>
		<CardBody>
			{#each fields as field}
				<AppFormField {field} bind:value={value[field.name]} />
			{/each}

			<div class="flex justify-end gap-2 ms-auto">
				{#each actions as action}
					{#if action === 'cancel'}
						<Button onclick={() => location.back()}>Cancel</Button>
					{:else}
						<Button color={action.color} type={action.action ? 'submit' : 'button'}>
							{action.text}
						</Button>
					{/if}
				{/each}
			</div>
		</CardBody>
	</Card>
</form>
