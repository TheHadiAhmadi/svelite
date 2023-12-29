<script>
	import PageModules from "$lib/admin/PageModules.svelte";
	import Button from "$lib/core/Button/Button.svelte";
	import Icon from "$lib/core/Icon/Icon.svelte";
	import Page from "$lib/core/Page/Page.svelte";


	import Form from "../../[collection]/Form.svelte";

    let {data, ...rest} = $props()

    const fields = [
        {Label: 'Title', name: 'title', type: 'plain_text', colMd: 6},
        {Label: 'Slug', name: 'slug', type: 'plain_text', colMd: 6},
        {Label: 'Modules', name: 'modules', type: 'custom', component: PageModules}
    ]

    const props1 = {
        onsubmit: 'pages:update'
    }

    const params = { id: data.id }

</script>

<Page title="Update Page">
    {#snippet actions()}
        <Button href="/admin/pages"><Icon name="chevron-left"/>Back</Button>
    {/snippet}
    <Form {params} {...props1} load="pages:id:=:id" actions={["cancel", {text: "Update", action: true, color: 'primary'}]} {fields}/>
</Page>
