<script context="module">
    export const parameters = [
        {name: 'text', label: 'Text', type: 'plain_text'},
        {name: 'bgcolor', label: 'background color', type: 'plain_text'},
    ]
</script>
<script>
    let {text = 'Header', bgcolor, ...rest} = $props()
</script>
<div class="flex items-center justify-center text-2xl py-12 px-4 bg-red-300 text-red-800" style="background-color: {bgcolor}">{text}</div>
