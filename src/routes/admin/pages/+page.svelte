<script>
	import Button from "$lib/core/Button/Button.svelte";
	import Icon from "$lib/core/Icon/Icon.svelte";
	import Page from "$lib/core/Page/Page.svelte";
	import Table from "$lib/admin/Table.svelte";

    const columns = [
        {name: 'ID', field: 'id', type: 'text'},
        {name: 'Title', field: 'title', type: 'text'},
        {name: 'Slug', field: 'slug', type: 'text'},
    ]

    const tableActions = [
        "remove",
        {icon: 'pencil', color: 'primary', href: '/admin/pages/{id}'},
        {icon: 'external-link', color: 'success', href: '/{slug}'},
    ]

</script>

<Page title="Pages">
    {#snippet actions()}
        <Button color="primary" href="/admin/pages/create">
            <Icon name="plus"/>
            Add Page
        </Button>
    {/snippet}

    <Table collection="pages" {columns} actions={tableActions}/>

</Page>
