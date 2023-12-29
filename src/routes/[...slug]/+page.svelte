<script>
    import '../../styles.css'
    import '../../styles.app.css'
	import modules from '$lib/ui';

    let {children, data, ...rest} = $props()
</script>

{#each data.page.modules ?? [] as module}
    <svelte:component this={modules[module.name].default} {...module.props}/>
{/each}
