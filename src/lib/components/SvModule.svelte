<script lang="ts">
    import { getContext } from "svelte";

	let { properties, component } = $props<any>();

	const {reload} = getContext('SV_LAYOUT')
</script>

<svelte:component this={component} {...properties} {reload} />
