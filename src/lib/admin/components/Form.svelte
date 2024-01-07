<script lang="ts">
	import Tabs from "$lib/core/Tabs/Tabs.svelte";

    let {value, children, footer} = $props()

</script>

<form>
    <Tabs>
        {@render children()}

        
        <div class="p-3 flex justify-end">
            {@render footer()}
        </div>
    </Tabs>

</form>
