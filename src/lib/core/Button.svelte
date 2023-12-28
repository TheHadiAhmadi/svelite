<script lang="ts">
	import Base from "./Base.svelte";
	import './button.css'


    let {children, color = "default", size="default", onclick, href, ...restProps} = $props()
</script>

<Base {onclick} {href} classes="button button-color-{color} button-size-{size}" tag={href ? 'a' : 'button'} {...restProps}>
    {@render children()}
</Base>
