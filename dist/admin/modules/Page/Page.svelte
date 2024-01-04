<script>
	import { Button, Icon, Page } from '../../../core';
	import SvSlot from '../../../svelite/SvSlot.svelte';

	let { title = '', content = [], ...data } = $props();
</script>

<Page {title}>
	{#snippet actions()}
		{#each data.actions ?? [] as action}
			{#if action === 'back'}
				<Button onclick={() => history.back()}>
					<Icon name="chevron-left" />
					Back
				</Button>
			{:else}
				<Button color={action.color} href={action.href}>
					{#if action.icon}
						<Icon name={action.icon} />
					{/if}
					{action.text}
				</Button>
			{/if}
		{/each}
	{/snippet}

	{#snippet children()}
		<SvSlot slot={content} />
	{/snippet}
</Page>
