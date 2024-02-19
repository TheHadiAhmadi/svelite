<script context="module">
	export async function load({api}) {

		return {
			todos: await api('/todos').get()
		}
	}

</script>

<script>
	let {data} = $props()
</script>

<div class="p-4">
	{#each data.todos as todo}
		<div class="flex items-center justify-between">
		    <div>{todo.name}</div>
		    <div>{todo.value}</div>
		</div>
	{/each}
</div>

