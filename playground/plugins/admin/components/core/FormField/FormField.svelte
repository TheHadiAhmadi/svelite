<script>
	// @ts-nocheck
	import Base from '../Base/Base.svelte';

	let { children, label, id, ...restProps } = $props();

</script>

<Base classes="mb-6 flex flex-col gap-1" {...restProps}>
	{#if label}
        <label class="text-sm font-medium text-gray-800 dark:text-gray-200" for="{id}">
			{#if typeof label === 'string'}
				{label}
			{:else}
				{@render label()}
			{/if}
		</label>
	{/if}
	{#if children}
		{@render children()}
	{/if}
</Base>
