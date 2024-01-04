import modules from './modules'

import PageModules from './components/PageModules.svelte';
import {form, page, table} from "$lib/admin/helpers";

export default (config: any) => {

    const layout = config.layout;
    const adminPrefix = config.adminPrefix;

    const pages = []

    // /admin/files routes and upload/edit/remove from admin panel
    const listPage = {
        slug: adminPrefix + '/pages',
        layout,
        modules: [
            page(
                'Page List',
                [
                    {
                        text: 'Create Page',
                        color: 'primary',
                        icon: 'plus',
                        href: '/' + adminPrefix + '/pages/create'
                    }
                ],
                [
                    table(
                        'pages',
                        [
                            { type: 'text', name: 'Title', field: 'title' },
                            { type: 'text', name: 'Slug', field: 'slug' }
                        ],
                        [
                            'remove',
                            { href: '/admin/pages/{id}', icon: 'edit' },
                            { icon: 'external-link', color: 'success', href: '/{slug}' }
                        ]
                    )
                ]
            )
        ]
    };

    const pageFormFields = [
        {
            name: 'title',
            label: 'Title',
            type: 'plain_text'
        },
        {
            name: 'slug',
            label: 'Slug',
            type: 'plain_text'
        },
        {
            name: 'modules',
            label: 'Modules',
            type: 'custom',
            component: PageModules,
            props: {
                modules
            }
        }
    ];

    const createPage = {
        slug: adminPrefix + '/pages/create',
        layout,
        modules: [
            page(
                'Create Page',
                ['back'],
                [
                    form(pageFormFields, ['cancel'], {
                        color: 'primray',
                        action: 'pages:insert',
                        text: 'Create'
                    })
                ]
            )
        ]
    };

    const editPage = {
        title: 'Edit Page',
        slug: 'admin/pages/{id}',
        layout,
        modules: [
            page(
                'Edit Page',
                ['back'],
                [
                    form(
                        pageFormFields,
                        ['cancel'],
                        {
                            color: 'primray',
                            action: 'pages:update',
                            text: 'Update'
                        },
                        'pages:id:=:id'
                    )
                ]
            )
        ]
    };

    pages.push(listPage);
    pages.push(createPage);
    pages.push(editPage);

    config.layout.props.sidebar.push({ icon: 'file', title: 'Pages', href: '/admin/pages' });

    const viewPage = {
        slug: '{...slug}',
        title: 'Page',
        modules: [
            {
                name: 'ViewPage',
                props: {
                    modules
                }
            }
        ]
    };

    pages.push(viewPage);

    return {
        pages,
        modules
    }
}
