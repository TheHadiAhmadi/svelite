<script>
	import { SvPage } from '$lib/svelite';
	import { page } from '$app/stores';
	let { data } = $props();
</script>

{#key $page.url.pathname}
	<SvPage {data} />
{/key}
