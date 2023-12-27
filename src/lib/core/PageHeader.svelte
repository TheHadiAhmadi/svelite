<script>
	let {title = "", children, ...rest} = $props();
</script>

<div class="flex justify-between items-center" {...rest}>
	{#if title}
		<h2 class="text-2xl font-bold">{title}</h2>
	{/if}

	<div class="flex ms-auto gap-2">
		{@render children()}
	</div>
</div>
