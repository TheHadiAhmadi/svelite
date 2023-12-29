<script>
	import Accordion from "$lib/core/Accordion/Accordion.svelte";
    import Button from "$lib/core/Button/Button.svelte";
    import Modal from "$lib/core/Modal/Modal.svelte";
	import Icon from "$lib/core/Icon/Icon.svelte";
	import ModalHeader from "$lib/core/Modal/ModalHeader.svelte";
	import modules from "$lib/ui";
	import ModalBody from "$lib/core/Modal/ModalBody.svelte";
	import FormField from "$lib/core/FormField/FormField.svelte";
	import Input from "$lib/core/Input/Input.svelte";

    let {value = [], ...rest} = $props()

    let addModalOpen = $state(false)

    function addModule(name) {
        value = [...(value ?? []), {name, props: {}}]
        addModalOpen = false;
    }

    function onAdd() {
        console.log('add module', value)
        addModalOpen = true
//        value = [...value??[], {name: 'new'}]

    }
</script>

<div>
    {#each value as item}
        <Accordion title={item.name}>
            {#each modules[item.name].parameters as parameter}
                <FormField label={parameter.label}>
                    {#if parameter.type === 'plain_text'}

                        <Input bind:value={item.props[parameter.name]}/>
                    {:else}
                        todo
                    {/if}

                </FormField>

            {/each}

        </Accordion>
    {/each}

    <Button type="button" onclick={onAdd} color="primary"> <Icon name="plus"/>Add Module</Button>
</div>

<Modal bind:open={addModalOpen}>
    <ModalHeader title="Add Module"/>
    <ModalBody>
        {#each Object.keys(modules) as moduleName}
            <div onclick={() => addModule(moduleName)} class="inline-block p-5 border border-gray-200 dark:border-gray-600">
                {moduleName}
            </div>
        {/each}
    </ModalBody>
</Modal>
