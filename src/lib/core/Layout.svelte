<script>
	import Base from './Base.svelte';

	const { children, theme = 'light', dir = 'ltr', sidebar, header, ...restProps } = $props();
</script>

<Base classes="h-full font-[math] {theme === 'dark' ? 'dark' : ''}" {dir}>
	{#snippet header_snippet(content)}
		<Base
			classes="fixed h-16 top-0 left-0 right-0 bg-white dark:bg-gray-800 dark:text-gray-200 border-1 border-b-solid border-gray-200 dark:border-gray-700 shadow-b"
		>
			{@render content({ hasSidebar: !!sidebar })}
		</Base>
	{/snippet}

	{#snippet sidebar_snippet(content)}
		<Base
			classes="fixed {header
				? 'top-16'
				: 'top-0'} bg-gray-200 dark:bg-gray-800 dark:text-gray-200 bottom-0 transition-all duration-300 flex ltr:md:left-0 ltr:left-[-15rem] rtl:md:right-0 rtl:right-[-15rem] w-60 border-e border-gray-200dark:border-gray-700 shadow-b"
		>
			{@render content()}
		</Base>
	{/snippet}

	{#if header}
		{@render header_snippet(header)}
	{/if}

	{#if sidebar}
		{@render sidebar_snippet(sidebar)}
	{/if}

	<Base
		classes="transition-all overflow-auto duration-300 h-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100  {header
			? 'pt-16'
			: ''} {sidebar ? 'ms-0 md:ms-60' : ''}"
		{...restProps}
	>
		{@render children()}
	</Base>
</Base>

<style lang="postcss">
	/* :global(.content.has-header) {
        margin-top: 64px; 
    }

    :global(.content.has-sidebar) {
        margin-inline-start: 0;
    }

    @media (min-width: 768px) {
        :global(.content.has-sidebar) {
            margin-inline-start: 15rem;
        }
    }  */
</style>
