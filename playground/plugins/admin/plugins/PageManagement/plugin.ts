import modules from './modules/index.js'

import PageModules from './components/PageModules.svelte';
import {form, page, table} from "../../helpers/index.js";

export default (config: any) => {

    const layout = config.layout;
    const adminPrefix = config.adminPrefix;
    const uiModules = config.uiModules;

    const pages = []

    // /admin/files routes and upload/edit/remove from admin panel
    const listPage = {
        slug: adminPrefix + '/pages',
        layout,
        modules: [
            page({
                title: 'Page List',
                hasBack: false,
                actions: [
                    {
                        text: 'Create Page',
                        color: 'primary',
                        icon: 'plus',
                        href: '/' + adminPrefix + '/pages/create'
                    }
                ],
                content: [
                    table(
                        'pages',
                        [
                            { type: 'text', label: 'Title', name: 'title' },
                            { type: 'text', label: 'Slug', name: 'slug' }
                        ],
                        [
                            'remove',
                            { href: '/admin/pages/{id}', icon: 'edit' },
                            { icon: 'external-link', color: 'success', href: '/{slug}' }
                        ]
                    )
                ]
            })
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
                modules: uiModules
            }
        }
    ];

    const createPage = {
        slug: adminPrefix + '/pages/create',
        layout,
        modules: [
            page({
                title: 'Create Page',
                actions: [],
                hasBack: true,
                content: [
                    form(pageFormFields, ['cancel'], {
                        color: 'primray',
                        action: 'pages:insert',
                        text: 'Create'
                    }, '', true)
                ]
            })
        ]
    };

    const editPage = {
        title: 'Edit Page',
        slug: 'admin/pages/{id}',
        layout,
        modules: [
            page({
                title: 'Edit Page',
                hasBack: true,
                actions: [],
                content: [
                    form(
                        pageFormFields,
                        ['cancel'],
                        {
                            color: 'primray',
                            action: 'pages:update',
                            text: 'Update'
                        },
                        'pages:id:=:id',
                        true
                    )
                ]
            })
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
                    modules: uiModules
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
