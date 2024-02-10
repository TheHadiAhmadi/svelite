<script>
	import { SvModule } from 'svelitecms/components';

	let { modules, data } = $props();

</script>

<svelte:head>
	{#if data.page}
		<title>{data.page.title}</title>
	{/if}
</svelte:head>

{#if data.page}
	{#each data.page.modules as module}
		<SvModule component={modules[module.name].component} properties={module.props} />
	{/each}
{:else}
	Empty Svelite Page
{/if}
