<script lang="ts">
	import Page from "$lib/core/Page/Page.svelte";
	import Button from "$lib/core/Button/Button.svelte";
	import Card from "$lib/core/Card/Card.svelte";
	import CardBody from "$lib/core/Card/CardBody.svelte";
	import FormField from "$lib/core/FormField/FormField.svelte";
    import Input from "$lib/core/Input/Input.svelte"; 
    import Select from "$lib/core/Select/Select.svelte";
	import Switch from "$lib/core/Switch/Switch.svelte";
	import api from "$lib/api.js";
	import {goto} from "$app/navigation";
	import {onMount} from "svelte";

    let {data} = $props()

    let value = $state({})

    onMount(() => {
        api(data.collection.slug)
            .find()
            .filter("id", "=", data.id)
            .first()
            .then(res => value = res.data ?? {})
    })

	async function onSubmit(e) {
		e.preventDefault()

        await api(data.collection.slug).update(value)

        goto('/admin/' + data.collection.slug)
	}

    
</script>

<Page title="Update {data.collection.name}">
    {#snippet actions()}
        <Button color="default" href="/admin/{data.collection.slug}">
			Back
		</Button>
    {/snippet}

	<form onsubmit={onSubmit}>
		<Card>
			<CardBody>
                {#each data.collection.fields as field}
                    <FormField label="{field.name}">
                        {#if field.type === "plain_text"}
                            <Input bind:value={value[field.name]} placeholder="something"/>
                        {:else if field.type === 'select'}
                            <Select bind:value={value[field.name]} items={field.items} placeholder="Choose a {field.name}..."/>
                        {:else if field.type === 'switch'}
                            <Switch bind:value={value[field.name]}/>
                        {:else if field.type === 'rich_text'}
                            Rich text editor
                        {:else if field.type === 'image'}
                            Image Picker
                        {/if}
                    </FormField>
                {/each}
{JSON.stringify(value)}

				<div class="flex justify-end gap-2 ms-auto">
					<Button color="default" type="submit">cancel</Button>
					<Button color="primary" type="submit">Submit</Button>
				</div>
			</CardBody>
		</Card>
	</form>
</Page>

