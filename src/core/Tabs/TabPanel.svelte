<script>
	import {getContext, onMount} from "svelte";
	import CardBody from "../Card/CardBody.svelte";

    let {name, children} = $props()

    let {onChange, register, unregister} = getContext("TABS")

    let index = $state(0)
    let activeIndex = $state(0)

    onMount(() => {
        index = register(name)

        onChange((newValue) => activeIndex = newValue)

        return () => unregister(name)
    })

</script>

<CardBody class="{activeIndex === index ? "": "hidden"}">
    {@render children()}
</CardBody>
