import AdminLayout from './AdminLayout.svelte';
export default {
    name: 'Admin Layout',
    description: 'layout for admin panel',
    props: {
        dir: { type: 'select', items: ['rtl', 'ltr'] },
        theme: { type: 'select', items: ['dark', 'light'] }
    },
    component: AdminLayout
};
