<script lang="ts">
	import Base from "./Base.svelte";


    let {children, onclick, href, ...restProps} = $props()
</script>

<Base {onclick} classes="transition inline-flex delay-0 py-2 px-4 shadow-sm shadow-blue rounded border-1 border-solid border-blue-600 hover:bg-blue-600 active:bg-blue-500 bg-blue-500 text-white" tag={href ? 'a' : 'button'} {...restProps}>
    {@render children()}
</Base>