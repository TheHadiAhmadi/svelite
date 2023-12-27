<script>
	import Base from './Base.svelte';
	import Header from './Header.svelte';
	import LayoutBody from './LayoutBody.svelte';
	import Sidebar from './Sidebar.svelte';

	let { children, theme = 'light', dir = 'ltr', sidebar, header, ...restProps } = $props();

	let hasHeader = !!header;
	let hasSidebar = !!sidebar;

	let themeClass= theme === 'dark' ? "dark" : ""
</script>
<Base classes="h-full font-[math] {themeClass}" {dir}>
	{#if hasHeader}
		<Header>
			{@render header({hasSidebar})}
		</Header>
	{/if}

	{#if hasSidebar}
		<Sidebar {hasHeader}>
		{@render sidebar()}
		</Sidebar>
	{/if}

	<LayoutBody {hasSidebar} {hasHeader}>
		{@render children()}
	</LayoutBody>
</Base>
