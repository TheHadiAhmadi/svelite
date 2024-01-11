<script lang="ts">
	import { onMount, setContext } from 'svelte';

	let { items = [], row, ...rest } = $props();

	let columns = $state<string[]>([]);

	let loading = $state(true);
	let empty = $state(false);

	function register(name: string) {
		if (loading) loading = false;

		if (columns.indexOf(name) == -1) columns = [...columns, name];
	}

	function unregister(name: string) {
		// columns = columns.filter(x => x !== name)
	}

	onMount(() => {
		if (columns.length == 0) {
			empty = true;
		}
	});
	setContext('TABLE', { register, unregister });
</script>

<div class="relative overflow-x-auto" class:min-h-80={loading} {...rest}>
	<div
		class="w-full h-full absolute flex items-center justify-center opacity-0 transition duration-400 bg-white dark:bg-gray-800"
		class:opacity-100={loading}
		class:pointer-events-none={!loading}
	>
		{#if empty}
			Empty
		{:else}
			Loading...
		{/if}
	</div>

	<table
		class="w-full text-sm text-left rtl:text-right transition duration-400 text-gray-500 dark:text-gray-400"
		class:opacity-0={loading}
	>
		<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				{#each columns as column}
					<th class="px-6 py-3">{column}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each items as item}
				<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
					{@render row(item)}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
