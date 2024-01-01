<script>
	import AdminLayout from './AdminLayout.svelte';

	let { children, data } = $props();
</script>

<AdminLayout {data}>
	{@render children()}
</AdminLayout>
