<script>

	import PageHeader from "$lib/core/PageHeader.svelte";
	import Page from "$lib/core/Page.svelte";
	import Button from "$lib/core/Button.svelte";
	import Card from "$lib/core/Card.svelte";
	import CardBody from "$lib/core/CardBody.svelte";
	import FormField from "$lib/core/FormField.svelte";
	import Input from "$lib/core/Input.svelte";

</script>
<Page>
	<PageHeader title="Create User">
		<Button color="default" href="/users">
			Back
		</Button>
	</PageHeader>
	<Card>
		<CardBody>
			<FormField label="Email">
				<Input value="demo@gmail.com" placeholder="something"/>
			</FormField>
			<FormField label="Password">
				<Input type="passwprd" value="123"/>
			</FormField>
		</CardBody>

	</Card>

	</Page>
