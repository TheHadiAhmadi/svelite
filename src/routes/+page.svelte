<script>
	import Card from '$lib/core/Card.svelte';
	import Base from '$lib/core/Base.svelte';
	import Page from '$lib/core/Page.svelte';

	import Button from '$lib/core/Button.svelte';
	import FormField from '$lib/core/FormField.svelte';

	let x = $state(1);
	let y = $state(1);

	let z = $state(0);

	$effect(() => {
		z = x * y;
	});
</script>

<Page>

	<Card title="Hello">
        <!-- {#snippet header()}
            Card Header
        {/snippet} -->
        {#snippet body()}
			<Button onclick={() => (x = x + 1)}>Increment x</Button>
			<Button onclick={() => (y = y + 1)}>Increment y</Button>

			<FormField>
				{#snippet label()}
					Hello
				{/snippet}
				<Base
					classes="py-2 px-3 bg-gray-100 dark:bg-gray-900 dark:text-gray-200 border-1 border-solid rounded border-gray-200 dark:border-gray-700 outline-none focus:ring focus:ring-blue-600"
					tag="input"
				/>
			</FormField>
            {z}

		{/snippet}
	</Card>

	<h1>Welcome to SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</Page>

