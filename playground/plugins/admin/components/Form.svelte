<script lang="ts">
    import {Tabs} from "$admin/components";

    let {loading, children, footer, ...rest} = $props()

    let tabs = $state([])
</script>

<form class="relative" {...rest}>
    <div class="absolute top-0 left-0 transition bg-gray-200 [z-index:1] rounded dark:bg-gray-800 w-full h-full min-h-400px flex items-center justify-center" class:opacity-100={loading} class:opacity-0={!loading} class:pointer-events-none={!loading}>
        Loading...
    </div>
    
    <Tabs bind:tabs>
        {@render children()}
        
        <div class="p-3 flex justify-end">
            {@render footer()}
        </div>
    </Tabs>
</form>
