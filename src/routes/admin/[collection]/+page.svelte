<script lang="ts">
	import api from "$lib/api.js";
	import Button from "$lib/core/Button/Button.svelte";
	import ButtonGroup from "$lib/core/Button/ButtonGroup.svelte";
	import Card from "$lib/core/Card/Card.svelte";
	import Icon from "$lib/core/Icon/Icon.svelte";
    import Page from "$lib/core/Page/Page.svelte";
	import PageHeader from "$lib/core/Page/PageHeader.svelte";
	import Table from "$lib/core/Table/Table.svelte";
	import TableColumn from "$lib/core/Table/TableColumn.svelte";
	import {onMount} from "svelte";


    let {data} = $props()

    let page = $state(1);
    let perPage = $state(10)
    let items: any[] = $state([])

    let filters : any[] = $state([])

    async function onRemove(item: any) {
    // confirm
    console.log('Should confirm')
        await api(data.collection.slug).remove(item.id)
        
        reload()
    }

    async function reload() {
        let query: any = api(data.collection.slug).find()

        for(let filter of filters) {
            query = query.filter(filter.field, filter.operator, filter.value)
        }
        items = await query.paginate(page, perPage).then(res => res.data)

    }
    onMount(() => {
        reload()
    })

</script>

{#if data.collection}
    <Page>
        <PageHeader title="{data.collection.name}">
            <Button href="/admin/{data.collection.slug}/create" color="primary">
                Create {data.collection.name}
            </Button>
        </PageHeader>

        <Card>
            {#key data.collection.slug}
                <Table {items}>
                    {#snippet row(item)}
                        <TableColumn name="Id">#{item.id}</TableColumn>
                        {#each data.collection.fields as field}
                            <!--Based on type...-->
                            <TableColumn name="{field.name}">{item[field.name]}</TableColumn>
                        {/each}
                        <TableColumn width=min name="Actions">
                            <ButtonGroup>
                                <Button ghost icon href="/admin/{data.collection.slug}/{item.id}" color="primary" size="sm">

                                    <Icon name="pencil"/>

                                </Button>
                                <Button ghost icon onclick={() => onRemove(item)} color="danger" size="sm">

                                    <Icon name="trash"/>

                                </Button>
                            </ButtonGroup>
                        </TableColumn>
                    {/snippet}
                </Table>
            {/key}
        </Card>
    </Page>
{:else}
    404
{/if}
