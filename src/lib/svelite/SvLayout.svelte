<script>
	let { children, data, ...rest } = $props();
</script>

{#if data.page.layout}
	<svelte:component this={data.page.layout.component}>
		{@render children()}
	</svelte:component>
{:else}
	{@render children()}
{/if}
