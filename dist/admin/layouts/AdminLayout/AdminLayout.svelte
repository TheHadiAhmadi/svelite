<script>
	import Layout from '../../../core/Layout/Layout.svelte';

	import SidebarItem from '../../../core/Sidebar/SidebarItem.svelte';
	import Icon from '../../../core/Icon/Icon.svelte';

	let { dir, theme, children, logo, sidebar: sidebarItems = [], data, ...restProps } = $props();

	let showSidebar = $state(false);

	function toggleSidebar() {
		showSidebar = !showSidebar;
	}
</script>

<Layout bind:showSidebar {dir} {theme} {...restProps}>
	{#snippet header({ hasSidebar })}
		<div class="flex items-center">
			{#if hasSidebar}
				<div class="md:hidden shrink-0 pe-4 w-10">
					<Icon onclick={toggleSidebar} name="menu-2" />
				</div>
			{/if}
			<img class="logo" src="/files/{logo}" />
		</div>

		<div class="hidden md:flex">
			Something here {hasSidebar}
			<button onclick={() => data.logout()}>Logout</button>
		</div>
	{/snippet}

	{#snippet sidebar()}
		{#each sidebarItems as item}
			<SidebarItem href={item.href} title={item.title} icon={item.icon} />
		{/each}
	{/snippet}

	{@render children()}
</Layout>

<style>
	.logo {
		width: 130px;
	}
</style>
