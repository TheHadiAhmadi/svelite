<script>
	let { children, ...rest } = $props();
</script>

<div class="p-4 md:p-5 space-y-4" {...rest}>
	{@render children()}
</div>
