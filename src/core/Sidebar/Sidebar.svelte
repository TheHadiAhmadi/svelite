<script>
	import Base from '../Base/Base.svelte';

	let { children, hasHeader, ...rest } = $props();
</script>

<Base
	classes="fixed {hasHeader
		? 'top-16'
		: 'top-0'} bg-gray-200 dark:bg-gray-800 dark:text-gray-200 bottom-0 transition-all duration-300 flex ltr:md:left-0 ltr:left-[-15rem] rtl:md:right-0 rtl:right-[-15rem] w-60 border-e border-gray-200 dark:border-gray-700 shadow-b"
	{...rest}
>
	<ul class="w-full p-3 space-y-2 font-medium">
		{@render children()}
	</ul>
</Base>
