<script lang="ts">
	import { Modal } from '$lib/core';
	import Button from '$lib/core/Button/Button.svelte';
	import ButtonGroup from '$lib/core/Button/ButtonGroup.svelte';

	import Card from '$lib/core/Card/Card.svelte';
	import Icon from '$lib/core/Icon/Icon.svelte';
	import ModalBody from '$lib/core/Modal/ModalBody.svelte';
	import Table from '$lib/core/Table/Table.svelte';
	import TableColumn from '$lib/core/Table/TableColumn.svelte';

	let { data, collection = '', columns = [], actions = [] } = $props();

	let removeConfirmOpen = $state(false);
	let activeItem = $state(null);

	function openRemove(item) {
		activeItem = item;
		removeConfirmOpen = true;
		console.log('open remove confirm');
	}

	function closeRemoveConfirm() {
		removeConfirmOpen = false;
	}

	async function onRemove() {
		data.remove(activeItem.id);
	}
</script>

<Card>
	<Table items={data?.items ?? []}>
		{#snippet row(item)}
			{#each columns as column}
				<TableColumn name={column.label}>
					{#if column.type === 'text'}
						{item[column.name]}
					{:else if column.type === 'badge'}
						<span class="py-0.5 px-2 rounded bg-gray-300 dark:bg-gray-700">
							{item[column.name]}
						</span>
					{/if}
				</TableColumn>
			{/each}

			{#if actions?.length}
				<TableColumn width="min" name="Actions">
					<ButtonGroup>
						{#each actions as action}
							{#if action === 'remove'}
								<Button onclick={() => openRemove(item)} icon ghost color="danger">
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

<Modal bind:open={removeConfirmOpen}>
	<ModalBody class="text-center p-4">
		<div class="w-full">
			<Icon class="mx-auto text-red-400 w-20 h-20" name="info-circle" />
		</div>
		Are you sure you want to remove this item?
		<div class="mt-4">
			<Button onclick={closeRemoveConfirm}>Cancel</Button>
			<Button onclick={onRemove} color="danger">Yes, Remove it</Button>
		</div>
	</ModalBody>
</Modal>
