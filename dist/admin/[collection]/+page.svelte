<script>
	import sv from '../../sv.js';
	import Button from '../../core/Button/Button.svelte';
	import ButtonGroup from '../../core/Button/ButtonGroup.svelte';
	import Card from '../../core/Card/Card.svelte';
	import Icon from '../../core/Icon/Icon.svelte';
	import Page from '../../core/Page/Page.svelte';
	import PageHeader from '../../core/Page/PageHeader.svelte';
	import Table from '../../core/Table/Table.svelte';
	import TableColumn from '../../core/Table/TableColumn.svelte';
	import { onMount } from 'svelte';
	let { data } = $props();
	let page = $state(1);
	let perPage = $state(10);
	let items = $state([]);
	let filters = $state([]);
	async function onRemove(item) {
		console.log('Should confirm');
		await sv.api(data.collection.slug).remove(item.id);
		reload();
	}
	async function reload() {
		let query = api(data.collection.slug).find();
		for (let filter of filters) {
			query = query.filter(filter.field, filter.operator, filter.value);
		}
		items = await query.paginate(page, perPage).then((res) => res.data);
	}
	onMount(() => {
		reload();
	});
</script>

{#if data.collection}
	<Page>
		<PageHeader title={data.collection.name}>
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
							<TableColumn name={field.name}>{item[field.name]}</TableColumn>
						{/each}
						<TableColumn width="min" name="Actions">
							<ButtonGroup>
								<Button
									ghost
									icon
									href="/admin/{data.collection.slug}/{item.id}"
									color="primary"
									size="sm"
								>
									<Icon name="pencil" />
								</Button>
								<Button ghost icon onclick={() => onRemove(item)} color="danger" size="sm">
									<Icon name="trash" />
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
