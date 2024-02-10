<script>
    import {Layout, SidebarItem, Icon} from '$admin/components';

	let { dir, theme, children, logo, sidebar: sidebarItems = [], data, ...restProps } = $props();

	let showSidebar = $state(false);

	function toggleSidebar() {
		showSidebar = !showSidebar;
	}
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.tailwindcss.com">
</svelte:head>

<Layout bind:showSidebar {dir} {theme} {...restProps}>
	{#snippet header({ hasSidebar })}
		<div class="flex items-center">
			{#if hasSidebar}
				<div class="md:hidden shrink-0 pe-4 w-10">
					<Icon onclick={toggleSidebar} name="menu-2" />
				</div>
			{/if}
            {#if logo.includes('/')}
                <img class="logo" src="{logo}" />
            {:else}
                <img class="logo" src="/files/{logo}" />
            {/if}
		</div>

		<div class="hidden md:flex">
			Something here {hasSidebar}
			<button onclick={() => data.logout()}>Logout</button>
		</div>
	{/snippet}

	{#snippet sidebar()}
		{#each sidebarItems as item}
            {@const visible = item.visible ? item.visible({user: data.user}) : true}
            {#if visible} 
                {#if item.submenu}
                    {@const active = item.submenu.some(x => x.href === $data.pathname)}
                    <SidebarItem href={item.href} {active} title={item.title} icon={item.icon}>
                        {#each item.submenu as menu}
                            {@const visible2 = menu.visible ? menu.visible({user: data.user}) : true}
                            {#if visible2}
                                <SidebarItem level={2} href={menu.href} active={menu.href === $data.pathname} title={menu.title} />
                            {/if}
                        {/each}
                    </SidebarItem>
                {:else}
                    <SidebarItem active={$data.pathname === item.href} href={item.href} title={item.title} icon={item.icon} />
                {/if}
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
