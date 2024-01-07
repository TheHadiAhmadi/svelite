<script>
    import {page} from '$app/stores'

	import Layout from '$lib/core/Layout/Layout.svelte';

	import SidebarItem from '$lib/core/Sidebar/SidebarItem.svelte';
	import Icon from '$lib/core/Icon/Icon.svelte';

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
            {#if item.submenu}
                {@const active = item.submenu.some(x => x.href === $page.url.pathname)}
                <SidebarItem href={item.href} {active} title={item.title} icon={item.icon}>
                    {#each item.submenu as menu}
                        <SidebarItem level={2} href={menu.href} active={menu.href === $page.url.pathname} title={menu.title} />
                    {/each}
                </SidebarItem>
            {:else}
                <SidebarItem active={$page.url.pathname === item.href} href={item.href} title={item.title} icon={item.icon} />
            {/if}
		{/each}
	{/snippet}

	{@render children()}
</Layout>

<style>
	.logo {
		width: 130px;
	}
</style>
