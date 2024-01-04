<script>
	import Base from '../Base/Base.svelte';
	import CardBody from './CardBody.svelte';
	import CardHeader from './CardHeader.svelte';
	let { children, body, header, title, ...restProps } = $props();
</script>

<Base
	classes="bg-white mt-3 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700"
	{...restProps}
>
	{#if header || title}
		<CardHeader children={header} {title} />
	{/if}
	{#if body}
		<CardBody children={body} />
	{/if}

	{#if children}
		{@render children()}
	{/if}
</Base>
