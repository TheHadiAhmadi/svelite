<script lang="ts">
	let {
		items = [],
		multiple = false,
		placeholder = null,
		key = 'key',
		text = 'text',
		value,
		...rest
	} = $props();

	function getKey(item) {
		return typeof item === 'object' ? item[key] : item;
	}

	function getText(item) {
		return typeof item === 'object' ? item[text] : item;
	}

	function select(item) {
		if (multiple) {
			if (!value) value = [];
			if (value.includes(getKey(item))) {
				value = value.filter((x) => x !== getKey(item));
			} else {
				value = [...value, getKey(item)];
			}
		} else {
			value = getKey(item);
		}
	}
	function onChange(val) {
		if (!multiple) {
			value = val;
		}
	}
</script>

<select
	onchange={(e) => onChange(e.target.value)}
	class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
	{multiple}
	{...rest}
>
	{#if placeholder}
		<option value={null} selected disabled>{placeholder}</option>
	{/if}

	{#each items as item}
		<option value={getKey(item)} on:click={() => select(item)}>{getText(item)}</option>
	{/each}
</select>
