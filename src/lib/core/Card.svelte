<script lang="ts">
	import Base from './Base.svelte';

	let { children, body, header, title, ...restProps } = $props();
</script>

{#snippet card_title({ text })}
	<Base tag="h2" classes="text-xl m-0 font-bold text-gray-800 dark:text-gray-100">
		{text}
	</Base>
{/snippet}

{#snippet card_body(body)}
	<Base tag="div" classes="p-3">
		{@render body()}
	</Base>
{/snippet}

{#snippet card_header({ header, title })}
	<Base tag="div" classes="px-3 py-2 border-b-solid border-1 border-gray-200 dark:border-gray-700">
		{#if header}
			{@render header({ title })}
		{/if}

		{#if !header && title}
			{@render card_title({ text: title })}
		{/if}
	</Base>
{/snippet}
<Base
	classes="bg-white dark:bg-gray-800 rounded border-1 border-solid border-gray-200 dark:border-gray-700"
	{...restProps}
>
	{#if header || title}
		{@render card_header({ header, title })}
	{/if}
	{#if body}
		{@render card_body(body)}
	{/if}

	{#if children}
		{@render children()}
	{/if}
</Base>
