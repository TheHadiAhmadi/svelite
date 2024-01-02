import Header from './Header.svelte';
export default {
    name: 'Header',
    description: 'Header component',
    props: {
        title: { type: 'plain_text', label: 'Title' },
        subtitle: { type: 'plain_text', label: 'Subtitle' },
        background: { type: 'plain_text', label: 'Background' }
    },
    component: Header
};
