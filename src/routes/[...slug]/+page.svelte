<script>
	import '../../styles.css';
	import '../../styles.app.css';
	import SvPage from '$lib/svelite/SvPage.svelte';

	let { data } = $props();
</script>

<SvPage {data} />
