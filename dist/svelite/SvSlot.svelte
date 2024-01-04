<script>
	import SvModule from './SvModule.svelte';

	let { slot = [] } = $props();
</script>

{#each slot as item}
	<SvModule component={item.component} properties={item.props} />
{/each}
