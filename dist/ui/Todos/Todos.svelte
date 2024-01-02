<script>
	import Icon from '../../core/Icon/Icon.svelte';

	let { data } = $props();

	let newValue = $state('');

	async function addTodo() {
		await data.insert({ title: newValue, done: false });
	}
</script>

<div
	class="mx-auto container p-4 my-4 flex flex-col gap-4 border border-gray-200 bg-gray-50 rounded"
>
	<h1 class="text-3xl font-bold text-center">Todos</h1>
	<div class="my-8 flex gap-4">
		<input
			type="text"
			placeholder="Add New Todo..."
			class="w-full p-2 border border-gray-200 bg-white"
			bind:value={newValue}
		/>
		<button class="px-4 py-2 bg-blue-500 text-white font-bold uppercase" onclick={() => addTodo()}
			>Add</button
		>
	</div>

	<div class="flex flex-col gap-4">
		{#each data.todos as item}
			<div class="p-4 border border-blue-400">
				<Icon onclick={() => data.remove(item.id)} class="text-red-500 w-6 h-6" name="trash" />
				{item.title}
			</div>
		{/each}
	</div>
</div>
