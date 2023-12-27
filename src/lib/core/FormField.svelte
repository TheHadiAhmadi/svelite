<script>
// @ts-nocheck

	import Base from "./Base.svelte";

    let {children, label, ...restProps} = $props();
</script>
<Base classes="mb-3 flex flex-col gap-2" tag="label" {...restProps}>
	{#if label}
		<span>
			{#if typeof label === 'string'}
				{label}
			{:else}
				{@render label()}
			{/if}
		</span>
	{/if}
	{#if children}
		{@render children()}
	{/if}
</Base>
