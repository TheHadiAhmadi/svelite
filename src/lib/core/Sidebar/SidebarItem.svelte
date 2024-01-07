<script>
	import Icon from '../Icon/Icon.svelte';

	let { title, href, active, level = 1, icon, children,...rest } = $props();

    let open = $state(active);
</script>

{#if children}
    <li>
        <button onclick={() => open = !open} type="button" class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
            <Icon class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
    name={icon}/>
            <span class="flex-1 ml-3 text-left whitespace-nowrap">{title}</span>
            <Icon class="w-6 h-6" name="chevron-down"/>
        </button>
        <ul class="py-2 group/submenu space-y-2" class:hidden={!open}>
            {@render children()}
        </ul>
    </li>

{:else}
    <li>
        <a
            {href}
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            class:bg-gray-100={active} class:dark:bg-gray-700={active} class:ms-10={level==2}
            {...rest}
        >
        {#if icon}
            <Icon
                class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                name={icon}
            />
        {/if}
            <span class="ms-3">{title}</span>
        </a>
    </li>
{/if}
