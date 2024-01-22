<script>
	import SvModule from './SvModule.svelte';

	let { page } = $props();

    console.log("page", page)
</script>

<svelte:head>
	{#if page}
		<title>{page.title}</title>
		<!-- Description.... -->
	{/if}
</svelte:head>
<div class="svelite-page">
{#if page}
	{JSON.stringify(page.modules)}
	{#each page.modules ?? [] as module}
		{module.name}
        {JSON.stringify(module)}
		<SvModule component={module.component} properties={module.props} />
	{/each}
{:else}
	Svelite Page Not found!
{/if}
</div>
