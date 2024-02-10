<script lang="ts">
	let { tag = 'div', children, class: klass = '', classes, ...restProps } = $props();
</script>

{#if children}
	<svelte:element this={tag} class="{classes} {klass}" {...restProps}>
		{@render children()}
	</svelte:element>
{:else}
	<svelte:element this={tag} class="{classes} {klass}" {...restProps} />
{/if}
