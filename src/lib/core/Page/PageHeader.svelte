<script>
	import Button from "../Button/Button.svelte";
	import Icon from "../Icon/Icon.svelte";

	let { title = '', hasBack, backUrl = '', children, ...rest } = $props();
</script>

<div>
    {#if hasBack}
        <Button class="p-0 gap-0 -ms-1" size="sm" href={backUrl} ghost >
            <Icon name="chevron-left"/>
            Back
        </Button>
    {/if}
    <div class="flex justify-between items-center" {...rest}>
        <h2 class="text-2xl font-bold">{title}</h2>
        {@render children()}
    </div>
</div>
