<script>
	import Base from "./Base.svelte";

    let {children, container = true, theme = 'light', dir="ltr", ...restProps} = $props()
</script>

<Base tag="div" classes="{theme === 'dark' ? "dark" : ""} p-3 h-full font-[math] bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100" {dir} {...restProps}>

    {#if container}
    <div class="mx-auto container">
        {@render children()}
    </div>

    {:else}
    {@render children()}
    {/if}
</Base>

<style>
    :global(html) {
        height: 100%;
    }

    :global(body) {
        height: 100%;
    }
    :global(*) {
        margin: 0;
        box-sizing: border-box;
    }
</style>