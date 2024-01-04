<script>
	import Accordion from '$lib/core/Accordion/Accordion.svelte';
	import Button from '$lib/core/Button/Button.svelte';
	import Modal from '$lib/core/Modal/Modal.svelte';
	import Icon from '$lib/core/Icon/Icon.svelte';
	import ModalHeader from '$lib/core/Modal/ModalHeader.svelte';
	import ModalBody from '$lib/core/Modal/ModalBody.svelte';
	import FormField from '$lib/core/FormField/FormField.svelte';
	import Input from '$lib/core/Input/Input.svelte';
	import AppFormField from './AppFormField.svelte';

	let { value = [], modules, ...rest } = $props();

	let addModalOpen = $state(false);

	function addModule(name) {
		value = [...(value ?? []), { name, props: {} }];
		addModalOpen = false;
	}

	function onAdd() {
		console.log(modules);
		console.log('add module', value);
		addModalOpen = true;
		//        value = [...value??[], {name: 'new'}]
	}
</script>

<div>
	{#each value as item}
		<Accordion title={item.name}>
			{#each Object.keys(modules[item.name].props ?? {}) as prop}
				<AppFormField field={modules[item.name].props[prop]} bind:value={item.props[prop]} />
			{/each}
		</Accordion>
	{/each}

	<Button type="button" onclick={onAdd} color="primary"><Icon name="plus" />Add Module</Button>
</div>

<Modal bind:open={addModalOpen}>
	<ModalHeader title="Add Module" />
	<ModalBody>
		{#each Object.keys(modules) as moduleName}
			<div
				onclick={() => addModule(moduleName)}
				class="mb-4 block p-4 border border-gray-200 bg-gray-600 dark:border-gray-600"
			>
				<div class="font-bold text-xl">{moduleName}</div>
				<div class="text-gray-300">
					{modules[moduleName].description}
				</div>
			</div>
		{/each}
	</ModalBody>
</Modal>
