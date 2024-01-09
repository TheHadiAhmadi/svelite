<script>
	import FormField from '../../core/FormField/FormField.svelte';
	import ImagePicker from '../../core/ImagePicker/ImagePicker.svelte';
	import Input from '../../core/Input/Input.svelte';
	import Select from '../../core/Select/Select.svelte';
	import Switch from '../../core/Switch/Switch.svelte';

	let { field, value, upload, file, ...rest } = $props();

</script>

<FormField label={field.label}>
	{#if field.type === 'custom'}
		{@const { value: _1, component, props = {}, ...rest } = field}
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
        <ImagePicker {file} {upload} multiple={field.multiple} bind:value />
	{:else if field.type === 'custom'}
		<svelte:component this={field.component} {...field.props} bind:value />
	{/if}
</FormField>
