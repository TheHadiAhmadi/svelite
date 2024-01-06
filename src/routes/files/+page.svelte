<script lang="ts">
    import '$lib/styles.css'
import FormField from "$lib/core/FormField/FormField.svelte";
	import ImagePicker from "$lib/core/ImagePicker/ImagePicker.svelte";
	import Input from '$lib/core/Input/Input.svelte';
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

<div class="container mx-auto">
    <FormField label="File Picker">
        <ImagePicker {upload} bind:value={value}/>
    </FormField>

    <FormField label="File Picker (multiple)">
        <ImagePicker multiple {upload} bind:value={values}/>
    </FormField>
</div>
