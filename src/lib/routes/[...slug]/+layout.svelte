<script>
	import { SvLayout } from '$lib/svelite';
	import '../../styles.css';

	let { data, children } = $props();
</script>

<SvLayout {data}>
	{@render children()}
</SvLayout>
