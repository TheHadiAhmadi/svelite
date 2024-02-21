<script>
    import SvPage from './SvPage.svelte'
	let { page } = $props();
    
    console.log(page)
</script>

{#if page.layout?.component}
	<svelte:component this={page.layout.component} {...page.layout.props}>
        <SvPage {page}/>
	</svelte:component>
{:else}
    <SvPage {page}/>
{/if}
