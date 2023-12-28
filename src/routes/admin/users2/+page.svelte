<script lang="ts">
	import Button from '$lib/core/Button.svelte';
	import Card from '$lib/core/Card.svelte';
	import Page from '$lib/core/Page.svelte'
	import ButtonGroup from '$lib/core/ButtonGroup.svelte'
	import PageHeader from '$lib/core/PageHeader.svelte';
	import Table from '$lib/core/Table.svelte';
	import TableColumn from '$lib/core/TableColumn.svelte';


	let items = [
		{id: 1, name: 'Hadi', username: 'thehadiahmadi'},
		{id: 2, name: 'Hadi 2', username: 'thehadiahmadi2'},
		{id: 3, name: 'Hadi 3', username: 'thehadiahmadi3'},
		{id: 4, name: 'Hadi 4', username: 'thehadiahmadi4'},
		{id: 5, name: 'Hadi 5', username: 'thehadiahmadi5'},
	]

</script>

<Page>
	<PageHeader title="Users">
		<Button href="/users/create" color="primary">Create</Button>
	</PageHeader>

	<Card>
		<Table {items}>
			{#snippet row(item: any)}
				<TableColumn name="Id">#{item.id}</TableColumn>
				<TableColumn name="Name">{item.name}</TableColumn>
				<TableColumn name="Username">{item.username}</TableColumn>
                    <TableColumn name="Actions">
                        <ButtonGroup>
                            <Button color="primary" size="sm">Edit</Button>
                            <Button color="danger" size="sm">Remove</Button>

                        </ButtonGroup>
                        </TableColumn>
			{/snippet}
		</Table>
	</Card>

</Page>

