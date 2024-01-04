<script lang="ts">
	let { properties, component } = $props<any>();
</script>

<svelte:component this={component} {...properties} />
