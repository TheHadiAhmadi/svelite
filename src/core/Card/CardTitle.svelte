<script>
	import Base from '../Base/Base.svelte';

	let { children, ...rest } = $props();
</script>

<Base tag="h2" classes="text-xl m-0 font-bold text-gray-800 dark:text-gray-100" {...rest}>
	{@render children()}
</Base>
