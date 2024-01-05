<script>import { getContext, onMount } from "svelte";
let { name, width = "auto", children, ...rest } = $props();
const { register, unregister } = getContext("TABLE");
onMount(() => {
  console.log("Run effect");
  register(name);
  return () => unregister(name);
});
</script>

<td class="px-6 py-4" class:w-0={width === 'min'} {...rest}>
	{@render children()}
</td>
