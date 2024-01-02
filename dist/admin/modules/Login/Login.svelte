<script>
	import {Input} from "../../../core";
	import Button from "../../../core/Button/Button.svelte";
	import ButtonGroup from "../../../core/Button/ButtonGroup.svelte";
	import Card from "../../../core/Card/Card.svelte";
	import CardBody from "../../../core/Card/CardBody.svelte";
	import CardHeader from "../../../core/Card/CardHeader.svelte";
	import FormField from "../../../core/FormField/FormField.svelte";

    let request = $state({})

    let {data} = $props()
</script>

<Card>
    <form>
        <CardHeader title="Login"/>
        <CardBody>
            <FormField label="Username">
                <Input name="username" bind:value={request.username}/>
            </FormField>
            <FormField label="Password">
                <Input type="password" name="password" bind:value={request.password}/>
            </FormField>
            <ButtonGroup>
                <Button color="primary" class="px-10 ms-auto" size="lg" type="submit">Login</Button>
            </ButtonGroup>
        </CardBody>
    </form>
</Card>
