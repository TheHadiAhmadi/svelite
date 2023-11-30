<script>
// @ts-nocheck

	import Base from "./Base.svelte";

    let {children, label, ...restProps} = $props();
</script>
<Base classes="mb-3 flex flex-col gap-2" tag="label" {...restProps}>
    <span>{@render label()}</span>
    {@render children()}
</Base>