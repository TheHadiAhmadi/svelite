<script>

	import Base from "../Base/Base.svelte";

	let { children, ...rest} = $props();
</script>

<Base
	classes="fixed h-16 top-0 left-0 right-0 flex items-center justify-between bg-white dark:bg-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-b"
 {...rest}>
	{@render children()}
</Base>
