<script>
    import Layout from '$lib/core/Layout.svelte'

    import '../../styles.css'
    import '../../styles.admin.css'
	import SidebarItem from '$lib/core/SidebarItem.svelte';

    let {children, data, ...restProps} = $props();


</script>


<Layout dir="ltr" theme="light" {...restProps}>
    {#snippet header({hasSidebar})}
		Something here {hasSidebar}
    {/snippet}
    {#snippet sidebar()}
    {#each data.config.collections as collection}
        <SidebarItem href="/admin/{collection.slug}" title={collection.name}/>
    {/each}
    {/snippet}
    {@render children()}
</Layout>
