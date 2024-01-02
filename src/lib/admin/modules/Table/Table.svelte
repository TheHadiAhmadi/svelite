<script lang="ts">
	import Button from '$lib/core/Button/Button.svelte';
	import ButtonGroup from '$lib/core/Button/ButtonGroup.svelte';

	import Card from '$lib/core/Card/Card.svelte';
	import Icon from '$lib/core/Icon/Icon.svelte';
	import Table from '$lib/core/Table/Table.svelte';
	import TableColumn from '$lib/core/Table/TableColumn.svelte';
	import { onMount } from 'svelte';

	let { data, collection = '', columns = [], actions = [], ...rest } = $props();

console.log(data, collection, columns)
	async function onRemove(item: any) {
        data.remove(item.id)
	}

	async function reload() {
        data.reload()
	}
</script>

{JSON.stringify(data)}
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
