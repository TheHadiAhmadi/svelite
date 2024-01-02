<script>
	import AdminLayout from '$lib/layouts/AdminLayout/AdminLayout.svelte';

	let { children, data } = $props();
</script>

<AdminLayout {data}>
	{@render children()}
</AdminLayout>
