<script>
// @ts-nocheck
	import Base from "../Base/Base.svelte";

    let {children, label, ...restProps} = $props();
</script>
<Base classes="mb-6 flex flex-col gap-2" {...restProps}>
	{#if label}
		<label for="">
			{#if typeof label === 'string'}
				{label}
			{:else}
				{@render label()}
			{/if}
		</label>
	{/if}
	{#if children}
		{@render children()}
	{/if}
</Base>
