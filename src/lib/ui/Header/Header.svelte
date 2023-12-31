<script>
    let {title = 'Header', background, subtitle, ...rest} = $props()
</script>

<div class="relative h-[50vh] bg-gray-200 flex items-center" style="background-color: {background}">
    <!-- <img class="absolute w-full h-full" src="/files/{background}"/> -->
    <div class="absolute w-full h-full top-0 left-0 flex items-center justify-center flex-col">
        <h1 class="text-3xl mb-6">{title}</h1>
        <h2 class="text-xl text-gray-700">{subtitle}</h2>
    </div>
</div>
