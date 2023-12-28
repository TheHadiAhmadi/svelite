<script lang="ts">
	import PageHeader from "$lib/core/PageHeader.svelte";
	import Page from "$lib/core/Page.svelte";
	import Button from "$lib/core/Button.svelte";
	import Card from "$lib/core/Card.svelte";
	import CardBody from "$lib/core/CardBody.svelte";
	import FormField from "$lib/core/FormField.svelte";
    import Input from "$lib/core/Input.svelte"; 
    import Select from "$lib/core/Select.svelte";
	import Switch from "$lib/core/Switch.svelte";

	let value: any = {}

	function onSubmit(e) {
		e.preventDefault()
		console.log(e)
	}

    let {data} = $props()
</script>
<Page>
    <PageHeader title="Create {data.collection.name}">
        <Button color="default" href="/admin/{data.collection.slug}">
			Back
		</Button>
	</PageHeader>
	<form onsubmit={onSubmit}>
		<Card>
			<CardBody>
                {#each data.collection.fields as field}
                    <FormField label="{field.name}">
                        {#if field.type === "plain_text"}
                            <Input bind:value={value[field.name]} placeholder="something"/>
                        {:else if field.type === 'select'}
                            <Select items={field.items} placeholder="Choose a {field.name}..."/>
                        {:else if field.type === 'switch'}
                            <Switch bind:value={value.active}/>
                        {:else if field.type === 'rich_text'}
                            Rich text editor
                        {:else if field.type === 'image'}
                            Image Picker
                        {/if}
                    </FormField>
                {/each}

				<div class="flex justify-end gap-2 ms-auto">
					<Button color="default" type="submit">cancel</Button>
					<Button color="primary" type="submit">Submit</Button>
				</div>
			</CardBody>
			
		</Card>
	</form>

</Page>

