<script lang="ts">
	import Button from "../Button/Button.svelte";
    import ButtonGroup from "../Button/ButtonGroup.svelte";
	import Icon from "../Icon/Icon.svelte";

    let {multiple, upload, file, value } = $props();

    let inputEl: any;
    let files: any;

    function onPrev() {
        activeIndex = Math.max(0, activeIndex - 1);
    }

    function onNext() {
        activeIndex = Math.min(value.length - 1, activeIndex + 1);
    }

    async function onChangeFile(e) {

        const files = e.target.files

        if(upload) {
            if(multiple) {
                
                let newItems = []
                for(let file of files) {
                    newItems.push(await upload(file))
                }

                value ??= []

                value = [...value.slice(0, currentIndex), ...newItems, ...value.slice(currentIndex)]
                
                console.log('value: ', value)
                // value = await upload(files[0])
            } else {
                value = await upload(files[0])
            }
        }
    }

    function onRemove(index: number) {
        if(multiple) {
            value = value.filter((x, i) => i !== index)
            activeIndex = Math.max(0, index - 1)
            // remove all
        } else {
            value = undefined
        }
    }

    function onAdd(index: number) {
        console.log('index', index)

        inputEl.click()
    }


    let activeIndex = $state(0)
    let currentIndex = $state<string|undefined>(undefined)

    function onChange() {
        inputEl.click()
    }

</script>

<div class="overflow-hidden max-w-sm min-h-[240px] h-[240px] rounded relative group bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
    {#if multiple}
        <div class="flex flex-wrap gap-1">
            {#each value ?? [] as item, index}
                <div class="overflow-auto min-h-[200px] rounded relative group bg-gray-100 border border-gray-200 dark:border-gray-700" class:hidden={index !== activeIndex}>
                    <div class="transition absolute w-full h-full group-hover:bg-black/30"></div>
                    <img src={file(item)} class="w-full h-full object-cover" alt="">
                    <div class="absolute opacity-0 group-hover:opacity-100 top-0 w-full h-full flex items-center justify-center">
                        <ButtonGroup>
                            <Button type="button" color="primary" icon onclick={() => onAdd(index)}>
                                <Icon name="plus"/>
                            </Button>
                            <Button type="button" color="danger" icon onclick={() => onRemove(index)}>
                                <Icon name="trash"/>
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            {/each}
        </div>
        {#if value?.length}
            <div onclick={() => onPrev()} class="text-white absolute start-0 w-28 top-0 bottom-0 flex items-center justify-start transition bg-gradient-to-r from-transparent group-hover:from-black/30 to-transparent">
                <Icon class = "p-1 w-10" name="chevron-left"/>
            </div> <div onclick={() => onNext()} class="text-white absolute end-0 w-28 top-0 bottom-0 flex justify-end items-center bg-gradient-to-l transition from-transparent group-hover:from-black/30 to-transparent">
                <Icon class="p-1 w-10" name="chevron-right"/>
            </div>
        {/if}

        <div class="absolute flex items-center justify-center w-full h-full">
            <Button type="button" onclick={(e) => inputEl?.click()} color="primary">Choose Images</Button>
        </div>

    {:else}
        <div class="transition absolute w-full h-full group-hover:bg-black/30"></div>
        {#if value}
            <img src="http://localhost:3010/api/files/{value}" class="w-full h-full object-cover" alt="">
            <div class="absolute opacity-0 group-hover:opacity-100 top-0 w-full h-full flex items-center justify-center">
                <ButtonGroup>
                    <Button type="button" color="primary" icon onclick={() => onChange()}>
                        <Icon name="reload"/>
                    </Button>
                    <Button type="button" color="danger" icon onclick={() => onRemove()}>
                        <Icon name="trash"/>
                    </Button>
                </ButtonGroup>
            </div>
        {:else}
            <div class="absolute flex items-center justify-center w-full h-full">
                <Button type="button" onclick={(e) => inputEl?.click()} color="primary">Choose Image</Button>
            </div>
        {/if}
    {/if}
    <div class="absolute bottom-0 left-0 bg-gradient-to-l from-transparent via-black/30 text-white text-center to-transparent w-full">
        {#if multiple && value?.length}
            {activeIndex + 1} / {value.length}
        {/if}
    </div>
</div>

<input {multiple} bind:this={inputEl} bind:files onchange={onChangeFile} type="file" class="hidden" />
