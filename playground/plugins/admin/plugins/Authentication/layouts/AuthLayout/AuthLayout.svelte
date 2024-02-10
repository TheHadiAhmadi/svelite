<script>
	let { children } = $props();
</script>

<div class="h-screen p-4 flex items-start py-20 justify-center bg-gray-50">
	<div class="w-full max-w-md">
		{@render children()}
	</div>
</div>
