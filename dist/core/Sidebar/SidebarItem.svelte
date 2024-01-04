<script>
	let { title, href, icon, ...rest } = $props();
</script>

<li>
	<a
		{href}
		class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
		{...rest}
	>
		<Icon
			class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
			name={icon}
		/>
		<span class="ms-3">{title}</span>
	</a>
</li>
