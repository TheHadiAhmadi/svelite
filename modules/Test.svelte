<script>
    let {a} = $props()

    let count = $state(0)
</script>

<button onclick={() => count++}>Increment {count}</button>
<h1>Test {@html a}</h1>
