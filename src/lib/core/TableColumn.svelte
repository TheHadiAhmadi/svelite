<script lang="ts">
	import {getContext, onMount} from "svelte";

	let {name, children, ...rest} = $props();


	const {register, unregister} = getContext<any>("TABLE")

	onMount(() => {
		console.log("Run effect")
		register(name)
		return () => unregister(name)
	})
</script>
<td class="px-6 py-4" {...rest}>
	{@render children()}
</td>
