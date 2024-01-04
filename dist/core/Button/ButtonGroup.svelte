<script>
	let { children, ...rest } = $props();
</script>

<div class="flex items-center justify-center gap-2" {...rest}>
	{@render children()}
</div>
