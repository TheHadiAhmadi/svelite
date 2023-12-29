
<script lang="ts">
	import {goto} from "$app/navigation";
	import api from "$lib/api";
	import Button from "$lib/core/Button/Button.svelte";
	import Card from "$lib/core/Card/Card.svelte";
	import CardBody from "$lib/core/Card/CardBody.svelte";
	import FormField from "$lib/core/FormField/FormField.svelte";
	import Input from "$lib/core/Input/Input.svelte";
	import Select from "$lib/core/Select/Select.svelte";
	import Switch from "$lib/core/Switch/Switch.svelte";
	import {onMount} from "svelte";

    let {load, fields, onsubmit, actions, params, ...rest} = $props()

    let value: any = $state({})

    onMount(() => {
        if(load) {
            const [collection, field, operator, key] = load.split(':') 
            api(collection).find().filter(field, operator, params[key]).first().then(res => {
                console.log(res)
                value = res.data
            })
        }
    })

    async function onSubmit(e) {
        e.preventDefault()

        if(onsubmit) {
            const [collection, action] = onsubmit.split(':')
            const res = await api(collection)[action](value)

            goto('.')
        }
    }
</script>

<form onsubmit={onSubmit}>
    <Card>
        <CardBody>
            {#each fields as field}
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
                    {:else if field.type === 'custom'}
                        <svelte:component this={field.component} bind:value={value[field.name]}/>
                    {/if}
                </FormField>
            {/each}

            <div class="flex justify-end gap-2 ms-auto">
                {#each actions as action}
                    {#if action === 'cancel'}
                        <Button onclick={() => location.back()}>
                            Cancel
                        </Button>
                    {:else}
                        <Button color={action.color} type={action.action ? "submit": "button"}>
                            {action.text}
                        </Button>
                    {/if}
                {/each}
            </div>
        </CardBody>
    </Card>
</form>
