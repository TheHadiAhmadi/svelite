<script lang="ts">
	import Button from "$lib/core/Button.svelte";
	import ButtonGroup from "$lib/core/ButtonGroup.svelte";
	import Card from "$lib/core/Card.svelte";
    import Page from "$lib/core/Page.svelte";
	import PageHeader from "$lib/core/PageHeader.svelte";
	import Table from "$lib/core/Table.svelte";
	import TableColumn from "$lib/core/TableColumn.svelte";


    let {data} = $props()

</script>

{#if data.collection}
<Page>
    <PageHeader title="{data.collection.name}">
        <Button href="/admin/{data.collection.slug}/create" color="primary">
            Create {data.collection.name}
        </Button>
	</PageHeader>

	<Card>
		<Table items={data.rows}>
			{#snippet row(item)}
				<TableColumn name="Id">#{item.id}</TableColumn>
                {#each data.collection.fields as field}
                    <!--Based on type...-->
                    <TableColumn name="{field.name}">{item[field.name]}</TableColumn>
                {/each}
                <TableColumn name="Actions">
                    <ButtonGroup>
                        <Button href="/admin/{data.collection.slug}/{item.id}" color="primary" size="sm">Edit</Button>
                        <Button color="danger" size="sm">Remove</Button>
                    </ButtonGroup>
                </TableColumn>
			{/snippet}
		</Table>
	</Card>

</Page>

<pre>{JSON.stringify(data.config.collections, null, 2)}</pre>
{:else}
    404
{/if}
