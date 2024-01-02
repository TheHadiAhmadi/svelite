<script>
	import PageModules from '$lib/admin/PageModules.svelte';
	import Button from '$lib/core/Button/Button.svelte';
	import Icon from '$lib/core/Icon/Icon.svelte';
	import Page from '$lib/core/Page/Page.svelte';

	import Form from '$lib/admin/Form.svelte';

	const fields = [
		{ Label: 'Title', name: 'title', type: 'plain_text', colMd: 6 },
		{ Label: 'Slug', name: 'slug', type: 'plain_text', colMd: 6 },
		{ Label: 'Modules', name: 'modules', type: 'custom', component: PageModules }
	];

	const props = {
		onsubmit: 'pages:insert'
	};
</script>

<Page title="Create Page">
	{#snippet actions()}
		<Button href="/admin/pages"><Icon name="chevron-left" />Back</Button>
	{/snippet}
	<Form
		{...props}
		actions={['cancel', { text: 'Create', action: true, color: 'primary' }]}
		{fields}
	/>
</Page>
