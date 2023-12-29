<script>

	import Base from "../Base/Base.svelte";

	let {children, ...rest} = $props();
</script>

<Base tag="div" classes="p-3" {...rest}>
	{#if children}
		{@render children()}
	{/if}
</Base>
