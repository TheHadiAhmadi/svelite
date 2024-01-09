<script>import { goto } from "$app/navigation";
import Button from "../../../core/Button/Button.svelte";
import Card from "../../../core/Card/Card.svelte";
import CardBody from "../../../core/Card/CardBody.svelte";
import { getContext } from "svelte";
import AppFormField from "../../components/AppFormField.svelte";
let { data, load, goBack = false, submit, fields, actions, params, ...rest } = $props();
let value = $state(data.value ?? {});
const { back } = getContext("PAGE");
async function onSubmit(e) {
  e.preventDefault();
  if (data.submit) {
    data.submit(value);
    if (goBack) {
      back();
    }
  }
}
</script>

<form onsubmit={onSubmit}>
	<Card>
		<CardBody>
			{#each fields ?? [] as field}
                <AppFormField upload={data.upload} file={data.file} {field} bind:value={value[field.name]} />
			{/each}

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
		</CardBody>
	</Card>
</form>
