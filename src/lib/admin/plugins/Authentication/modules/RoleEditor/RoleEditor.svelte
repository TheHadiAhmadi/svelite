<script lang="ts">
	import Form from "$lib/admin/components/Form.svelte";
	import FormTab from "$lib/admin/components/FormTab.svelte";
	import {Input} from "$lib/core";
	import Button from "$lib/core/Button/Button.svelte";
	import ButtonGroup from "$lib/core/Button/ButtonGroup.svelte";
	import FormField from "$lib/core/FormField/FormField.svelte";

    let {data, collections} = $props()

    let value: any = {}
</script>

<Form>
    <FormTab name="General">
        <FormField label="Name">
            <Input bind:value={value.name}/>
        </FormField>
        <FormField label="Description">
            <Input bind:value={value.description}/>
        </FormField>
    </FormTab>
    <FormTab name="Permissions">

        {#each collections as collection}
            <FormField label={collection.name}>
                <div>Create</div>
                <div>Read</div>
                <div>Update</div>
                <div>Delete</div>
            </FormField>
        {/each}
    </FormTab>

    {#snippet footer()}
        <ButtonGroup>

            <Button>Cancel</Button>
            <Button color="primary">Submit</Button>
        </ButtonGroup>

    {/snippet}

</Form>
