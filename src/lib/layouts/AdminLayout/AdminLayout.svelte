<script>
	import Layout from '$lib/core/Layout/Layout.svelte';

	import SidebarItem from '$lib/core/Sidebar/SidebarItem.svelte';
	import Icon from '$lib/core/Icon/Icon.svelte';

	let { children, data, ...restProps } = $props();

	let showSidebar = $state(false);

	function toggleSidebar() {
		showSidebar = !showSidebar;
	}
</script>

<Layout bind:showSidebar dir="ltr" theme="light" {...restProps}>
	{#snippet header({ hasSidebar })}
		<div class="flex items-center">
			{#if hasSidebar}
				<div class="md:hidden shrink-0 px-4 w-14">
					<Icon onclick={toggleSidebar} name="menu-2" />
				</div>
			{/if}
			<img class="logo" src={data.config.logo} />
		</div>

		<div class="hidden md:flex">
			Something here {hasSidebar}
		</div>
	{/snippet}
	{#snippet sidebar()}
		{#each data.config.sidebar as item}
			<SidebarItem href={item.href} title={item.title} />
		{/each}
	{/snippet}
	{@render children()}
</Layout>

<style>
	.logo {
		width: 130px;
	}
</style>
