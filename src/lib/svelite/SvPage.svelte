<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.page.title}</title>
	<!-- Description.... -->
</svelte:head>

{#each data.page.modules ?? [] as module}
	<svelte:component this={module.component} {...module.props} />
{/each}
