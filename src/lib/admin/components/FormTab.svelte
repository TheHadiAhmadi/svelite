<script>
	import TabPanel from "$lib/core/Tabs/TabPanel.svelte";

    let {name, children} = $props()
</script>
<TabPanel {name}>
    {@render children()}
</TabPanel>
