<script>

	import Base from "./Base.svelte";
	import CardTitle from "./CardTitle.svelte";

	let {children, title, ...rest} = $props()

</script>

<Base tag="div" classes="px-3 py-2 border-b border-gray-200 dark:border-gray-700" {...rest}>
	{#if title}
		<CardTitle>
			{title}
		</CardTitle>
	{/if}
	{#if children}
		{@render children()}
	{/if}
</Base>

