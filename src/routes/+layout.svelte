<script>
    import Header from '$lib/core/Header.svelte';
import Layout from '$lib/core/Layout.svelte'
    import '../app.css'

    let {children,...restProps} = $props();
</script>


<Layout dir="ltr" theme="light" {...restProps}>
    {#snippet header({hasSidebar})}
		Something here {hasSidebar}
    {/snippet}
    {#snippet sidebar()}
        sidebar
    {/snippet}
    {@render children()}
</Layout>
