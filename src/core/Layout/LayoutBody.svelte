<script>
	import Base from '../Base/Base.svelte';

	let { children, hasSidebar, hasHeader, ...rest } = $props();
</script>

<Base
	classes="transition-all overflow-auto duration-300 h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100  {hasHeader
		? 'pt-16'
		: ''} {hasSidebar ? 'ms-0 md:ms-60' : ''}"
	{...rest}
>
	{@render children()}
</Base>
