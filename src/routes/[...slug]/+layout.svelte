<script>
	import SvLayout from '$lib/svelite/SvLayout.svelte';

	import '../../../styles.css';
	import '../../../styles.admin.css';

	let { children, data } = $props();
</script>

<SvLayout {data}>
	{@render children()}
</SvLayout>
