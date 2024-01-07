<script lang="ts">
    import '$lib/styles.css'
    import FormField from "$lib/core/FormField/FormField.svelte";
	import ImagePicker from "$lib/core/ImagePicker/ImagePicker.svelte";
	import Input from '$lib/core/Input/Input.svelte';
    import TabPanel from '$lib/core/Tabs/TabPanel.svelte';
    import Tabs from '$lib/core/Tabs/Tabs.svelte';
    let value: string;
    let values: string[] = [];

    async function upload(file: File) {
        console.log(file)

        const formData = new FormData()
        formData.append('file', file)

        const res = await fetch('http://localhost:3010/api/files', {
            method: 'POST',
            body: formData
        }).then(res => res.json())

        return res.data.id
    }
</script>

TABS:
<div>
    <Tabs>
        <TabPanel name="Panel1">Panel1</TabPanel>
        <TabPanel name="Panel2">Panel2</TabPanel>
        <TabPanel name="Panel3">Panel3</TabPanel>

    </Tabs>

</div>

<div class="container mx-auto">
    <FormField label="File Picker">
        <ImagePicker {upload} bind:value={value}/>
    </FormField>

    <FormField label="File Picker (multiple)">
        <ImagePicker multiple {upload} bind:value={values}/>
    </FormField>
</div>
