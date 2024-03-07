<script>
    import { onMount, setContext } from "svelte";
    import SvPage from "./SvPage.svelte";
    import { writable } from "svelte/store";
    let { page, load } = $props();

    let reloadKey = $state(false);

    let layout = $state(page.layout)

    async function reload(reloadLayout = false) {
        if (reloadLayout) {
            if (page.layout?.reload) {
                await page.layout.reload();
                reloadKey = !reloadKey;
            }
        }

        for (let module of page.modules) {
            if (module?.reload) {
                await module.reload();
                reloadKey = !reloadKey;
            }
        }
    }

    function goto(pathname) {
        return navigate(window.location.href + pathname)
    }
    // Function to handle navigation
    const navigate = async(url) => {
        history.pushState({}, "", url);
        console.log('navigate: ', url)

        if(!url) return;
        navigating.set(true)

        const result = await load(new URL(url))
        if(result) {
            // page = result

            if(result.layout) {
                if(JSON.stringify(result.layout) !== JSON.stringify(layout)) {
                    layout = result.layout
                }
            }

            if(JSON.stringify(page) !== JSON.stringify(result)) {
                page = result
            }
        }
        navigating.set(false)

    };

    onMount(() => {
        const handleNavigation = async (event) => {
            let target = event.target
            while (target && target.tagName !== 'A' && target.tagName !== 'HTML') {
                target = target.parentElement;
            }

            if (target.tagName === 'A') {
                event.preventDefault();
                const url = target.href;

                await navigate(url);
            }
        };

        console.log('routing initialized')
        // Add event listener to handle clicks on <a> tags
        document.addEventListener("click", handleNavigation);

        return () => {
            // Cleanup function to remove event listener
            document.removeEventListener("click", handleNavigation);
        };
    });

    const navigating = writable(false)
    setContext("SV_LAYOUT", { reload, navigating, goto });
</script>

{#if layout}
    <svelte:component
        this={layout.component}
        {...layout.props}
        {reload}
    >
        {#key reloadKey}
            <SvPage {page} />
        {/key}
    </svelte:component>
{:else}
    {#key reloadKey}
        <SvPage {page} />
    {/key}
{/if}
