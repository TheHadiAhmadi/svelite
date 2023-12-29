<script>
    import 'iconify-icon';
	import Base from '../Base/Base.svelte';

    let {name, ...rest} = $props()

</script>

<Base classes="icon inline-block" {...rest}>
    <iconify-icon width="100%" height="100%" icon="tabler:{name}"/>
</Base>

<style>
    :global(.icon *) {
        vertical-align: top;
    }

</style>
