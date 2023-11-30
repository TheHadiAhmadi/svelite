<script>
    import Layout from '$lib/core/Layout.svelte'
    import 'virtual:uno.css'

    let {children,...restProps} = $props();
</script>


<Layout dir="rtl" theme="dark" {...restProps}>
    {#snippet header({hasSidebar})}
        Header
        hasSidebar: {hasSidebar}
    {/snippet}
    {#snippet sidebar()}
        sidebar
    {/snippet}
    {@render children()}
</Layout>