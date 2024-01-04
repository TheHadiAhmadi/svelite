import HeaderSvelte from './Header.svelte'

export default {
    name: "Header",
    description: "Header Module",
    props: {
        text: {type: 'plain_text', label: "Text"},
    },
    component: HeaderSvelte
}
