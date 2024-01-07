<script>
	import {setContext} from "svelte";
	import Card from "../Card/Card.svelte";
	import CardHeader from "../Card/CardHeader.svelte";

    let {children} = $props()
    let tabs = $state([]) 

    let activeIndex = $state(0)

    function register(name) {
        console.log('register', name)

        tabs = [...tabs, name]
        return tabs.length - 1
    }

    let callbacks = [];
    function onChange(cb) {
        callbacks.push(cb)
    }

    function unregister(name) {
        tabs = tabs.filter(x => x!==name)
    }

    $effect(() => {
        for(let callback of callbacks) {
            callback(activeIndex)
        }
    })
    setContext("TABS", {register, unregister, onChange})
</script>
<div>
    <Card>
        <CardHeader class="bg-gray-200 dark:bg-gray-700 pb-0 flex gap-1 border-gray-200 dark:border-gray-600 rounded-t">
            {#each tabs as tab, index}
                <div class="bg-transparent border px-4 py-2 -mb-px rounded-t border  cursor-pointer" class:dark:border-transparent={activeIndex !== index} class:bg-white={activeIndex === index} class:border-gray-200={activeIndex === index} class:border-b-transparent={activeIndex === index} class:dark:border-gray-600={activeIndex === index} class:dark:border-b-transparent={activeIndex === index} class:dark:bg-gray-800={activeIndex === index} onclick={() => activeIndex = index}>{tab}</div>
            {/each}
        </CardHeader>

        {@render children()}

    </Card>
</div>
