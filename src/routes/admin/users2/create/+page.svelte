<script lang="ts">

	import PageHeader from "$lib/core/PageHeader.svelte";
	import Page from "$lib/core/Page.svelte";
	import Button from "$lib/core/Button.svelte";
	import Card from "$lib/core/Card.svelte";
	import CardBody from "$lib/core/CardBody.svelte";
	import FormField from "$lib/core/FormField.svelte";
	import Input from "$lib/core/Input.svelte"; import Select from "$lib/core/Select.svelte";
	import Switch from "$lib/core/Switch.svelte";

	let value: any = {}

    let roles = [
        {id: '1', value: "Admin"},
        {id: '2', value: "Developer"},
        {id: '3', value: "Editor"},
    ]

	function onSubmit(e) {
		e.preventDefault()
		console.log(e)
	}
</script>
<Page>
	<PageHeader title="Create User">
		<Button color="default" href="/users">
			Back
		</Button>
	</PageHeader>
	<form onsubmit={onSubmit}>
		<Card>
			<CardBody>
				<FormField label="Email">
					<Input value="demo@gmail.com" placeholder="something"/>
				</FormField>
				<FormField label="Password">
					<Input type="passwprd" value="123"/>
				</FormField>
                <FormField label="Role">
                    <Select items={roles} key="id" text="value" placeholder="Choose a role..."/>
                </FormField>

                <Switch text="Active" bind:value={value.active}/>
				<div class="flex justify-end gap-2 ms-auto">
					<Button color="default" type="submit">cancel</Button>
					<Button color="primary" type="submit">Submit</Button>

				</div>
					
			</CardBody>
			
		</Card>
	</form>

</Page>
