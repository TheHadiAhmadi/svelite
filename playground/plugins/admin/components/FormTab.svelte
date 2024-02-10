<script>
    import {TabPanel} from "$admin/components";

    let {name, children} = $props()
</script>
<TabPanel {name}>
    {@render children()}
</TabPanel>
