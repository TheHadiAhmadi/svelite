<script>
	import SvModule from './SvModule.svelte';

	let { modules = [] } = $props();
</script>

{#each modules as item}
	<SvModule component={item.component} properties={item.props} />
{/each}
