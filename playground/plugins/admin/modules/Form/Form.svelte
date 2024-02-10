<script lang="ts">
	import {getContext, onMount} from 'svelte';

    import {Button, Card, CardBody, Tabs, TabPanel} from '$admin/components';

    import Form from '../../components/Form.svelte'
    import FormTab from '../../components/FormTab.svelte'
	import AppFormField from '../../components/AppFormField.svelte';

	let { data, load, tabs = [], goBack = false, submit, fields, actions, params, ...rest } = $props();

	let value: any = $state(data.value ?? {});
    let loading = $state(true)

    const {back} = getContext('PAGE')

	async function onSubmit(e) {
		e.preventDefault();

		if (data.submit) {
			data.submit(value);

            if(goBack) {
                back()
            }
		}
	}

    onMount(() => {
        loading = false

    })

</script>

<Form onsubmit={onSubmit} {loading}>
    {#each tabs ?? [] as tab}
        <TabPanel name={tab}>
            {#each fields.filter(x => x.tab === tab || (tab === 'General' && !x.tab)) as field}
                <AppFormField upload={data.upload} file={data.file} {field} bind:value={value[field.name]} />
            {/each}

        </TabPanel>
    {:else}
        <CardBody>
            {#each fields.filter(x => !x.tab) as field}
                <AppFormField upload={data.upload} file={data.file} {field} bind:value={value[field.name]} />
            {/each}
        </CardBody>
    {/each}

    {#snippet footer()}
        <div class="flex justify-end gap-2 ms-auto">
            {#each actions ?? [] as action}
                {#if action === 'cancel'}
                    <Button type="button" onclick={() => history.back()}>Cancel</Button>
                {:else}
                    <Button color={action.color} type="button">
                        {action.text}
                    </Button>
                {/if}
            {/each}
            {#if submit}
                <Button color="primary" type="submit">
                    {submit.text}
                </Button>
            {/if}
        </div>
    {/snippet}
</Form>
