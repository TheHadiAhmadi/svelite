<script>
	import { onMount } from 'svelte';
	import Base from '../Base/Base.svelte';
	import Header from '../Header/Header.svelte';
	import LayoutBody from './LayoutBody.svelte';
	import Sidebar from '../Sidebar/Sidebar.svelte';
	import Offcanvas from '../Offcanvas/Offcanvas.svelte';

	let {
		children,
		theme = 'light',
		dir = 'ltr',
		showSidebar,
		sidebar,
		header,
		...restProps
	} = $props();

	// let hasHeader = $state(true); //!!header;
	// let hasSidebar = $state(true); //!!sidebar;

	///     onMount(() => {
	// hasSidebar = !!sidebar;
	// hasHeader = !!header

	///  })

	//let themeClass= theme === 'dark' ? "dark" : "" let themeClass = 'dark'
</script>

<Base classes="h-full overflow-auto font-[math] dark" {dir}>
	{#if !!header}
		<Header>
			{@render header({ hasSidebar: !!sidebar })}
		</Header>
	{/if}

	{#if !!sidebar}
		<Sidebar hasHeader={!!header}>
			{@render sidebar()}
		</Sidebar>

		<Offcanvas bind:open={showSidebar}>
			<ul class="w-full py-3 space-y-2 font-medium">
				{@render sidebar()}
			</ul>
		</Offcanvas>
	{/if}

	<LayoutBody hasSidebar={!!sidebar} hasHeader={!!header}>
		{@render children()}
	</LayoutBody>
</Base>

<style>
	.offcanvas {
	}
</style>
