<script>
	import SvModule from './SvModule.svelte';

	let { page } = $props();
</script>

<svelte:head>
	{#if page}
		<title>{page.title}</title>
		<!-- Description.... -->
	{/if}
</svelte:head>

{JSON.stringify(page)}
PAGE: 
{#if page}
	{#each page.modules ?? [] as module}
		<SvModule component={module.component} properties={module.props} />
	{/each}
{:else}
	Svelite Page Not found!
{/if}
