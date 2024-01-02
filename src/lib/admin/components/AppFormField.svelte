<script>
	import FormField from '$lib/core/FormField/FormField.svelte';
	import Input from '$lib/core/Input/Input.svelte';
	import Select from '$lib/core/Select/Select.svelte';
	import Switch from '$lib/core/Switch/Switch.svelte';

	let { field, value, ...rest } = $props();
</script>

<FormField label={field.name}>
    {#if field.type === 'custom'}
        {@const {value: _1, component, props = {}, ...rest} = field}
        <svelte:component this={component} bind:value {...props} {...rest} />
    {:else if field.type === 'plain_text'}
		<Input bind:value placeholder={field.placeholder} />
	{:else if field.type === 'select'}
		<Select bind:value items={field.items} placeholder={field.placeholder} />
	{:else if field.type === 'switch'}
		<Switch bind:value />
	{:else if field.type === 'rich_text'}
		Rich text editor
	{:else if field.type === 'image'}
		Image Picker
	{:else if field.type === 'custom'}
		<svelte:component this={field.component} {...field.props} bind:value />
	{/if}
</FormField>
