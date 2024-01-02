<script>
	let { data } = $props();
</script>

<svelte:head>
    {#if data.page}
        <title>{data.page.title}</title>
        <!-- Description.... -->
    {/if}
</svelte:head>

{#if data.page}
    {#each data.page.modules ?? [] as module}
        <svelte:component this={module.component} {...module.props} />
    {/each}
{:else}
    Svelite Page Not found!
{/if}
