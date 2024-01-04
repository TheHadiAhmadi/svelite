<script>
	import Button from '../../../core/Button/Button.svelte';
	import ButtonGroup from '../../../core/Button/ButtonGroup.svelte';
	import Card from '../../../core/Card/Card.svelte';
	import Icon from '../../../core/Icon/Icon.svelte';
	import Table from '../../../core/Table/Table.svelte';
	import TableColumn from '../../../core/Table/TableColumn.svelte';
	let { data, collection = '', columns = [], actions = [] } = $props();
	async function onRemove(item) {
		data.remove(item.id);
	}
</script>

<Card>
	<Table items={data?.items ?? []}>
		{#snippet row(item)}
			{#each columns as column}
				<TableColumn name={column.name}>
					{#if column.type === 'text'}
						{item[column.field]}
					{:else if column.type === 'badge'}
						<span class="py-0.5 px-2 rounded bg-gray-300 dark:bg-gray-700"
							>{item[column.field]}</span
						>
					{/if}
				</TableColumn>
			{/each}

			{#if actions?.length}
				<TableColumn width="min" name="Actions">
					<ButtonGroup>
						{#each actions as action}
							{#if action === 'remove'}
								<Button onclick={() => onRemove(item)} icon ghost color="danger">
									<Icon name="trash" />
								</Button>
							{:else}
								<Button
									icon
									ghost
									href={action.href.replace('{id}', item.id).replace('{slug}', item.slug)}
									color={action.color}
								>
									<Icon name={action.icon} />
								</Button>
							{/if}
						{/each}
					</ButtonGroup>
				</TableColumn>
			{/if}
		{/snippet}
	</Table>
</Card>
