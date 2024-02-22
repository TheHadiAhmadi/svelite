<script>
    import { setContext } from 'svelte';
    import SvPage from './SvPage.svelte'
	let { page } = $props();

    let reloadKey = $state(false)
 
    async function reload() {
        if(page.layout?.reload) {
            await page.layout.reload()
        }
        
        for(let module of page.modules) {
            if(module?.reload) {
                await module.reload()
            }
        }
        reloadKey = !reloadKey
    }

    setContext('SV_LAYOUT', {reload})
</script>

{#key reloadKey}
    {#if page.layout?.component}
        <svelte:component this={page.layout.component} {...page.layout.props} {reload}>
            <SvPage {page}/>
        </svelte:component>
    {:else}
        <SvPage {page}/>
    {/if}

{/key}