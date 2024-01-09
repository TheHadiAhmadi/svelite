<script>
	import {afterNavigate, goto} from '$app/navigation';
	import { Button, Icon, Page } from '../../../core/index.js';
	import ButtonGroup from '../../../core/Button/ButtonGroup.svelte';
	import PageHeader from '../../../core/Page/PageHeader.svelte';
	import SvSlot from '../../../svelite/SvSlot.svelte';
	import {setContext} from 'svelte';

	let { title = '', hasBack = false, content = [], ...data } = $props();

    let pageEl = $state();

    function back() {
        pageEl.back()
    }

    setContext('PAGE', {back})
</script>

<Page bind:this={pageEl} {hasBack} {title}>
    {#snippet actions()}
		{#each data.actions ?? [] as action}
            <Button color={action.color} href={action.href}>
                {#if action.icon}
                    <Icon name={action.icon} />
                {/if}
                {action.text}
            </Button>
		{/each}
        {/snippet}

	{#snippet children()}
		<SvSlot slot={content} />
	{/snippet}
</Page>
