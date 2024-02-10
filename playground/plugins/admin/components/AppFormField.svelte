<script>
    import {FormField, Textarea, ImagePicker, Input, Select, Switch} from '$admin/components';

	let { field, value, upload, file, ...rest } = $props();

</script>

<FormField label={field.label}>
	{#if field.type === 'custom'}
		{@const { value: _1, component, props = {}, ...rest } = field}
		<svelte:component this={component} bind:value {...props} {...rest} />
	{:else if field.type === 'number'}
		<Input type="number" bind:value placeholder={field.placeholder} />
	{:else if field.type === 'plain_text'}
		<Input bind:value placeholder={field.placeholder} />
	{:else if field.type === 'select'}
		<Select bind:value items={field.items} placeholder={field.placeholder} />
	{:else if field.type === 'switch'}
		<Switch bind:value />
	{:else if field.type === 'rich_text'}
        <Textarea bind:value />
	{:else if field.type === 'image'}
        <ImagePicker {file} {upload} multiple={field.multiple} bind:value />
    {:else}
        TODO: {field.type}
	{/if}
</FormField>
