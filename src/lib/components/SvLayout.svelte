<script>
    import SvPage from './SvPage.svelte'
	let { page } = $props();
</script>

{#if page.layout}
	<svelte:component this={page.layout.component} {...page.layout.props}>
        <SvPage {page}/>
	</svelte:component>
{:else}
    <SvPage {page}/>
{/if}
