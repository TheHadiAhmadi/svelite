import {table, form, page} from "../../helpers/index.js";

export default (config: any) => {
    const collections = config.collections ?? []
    const pages: any[] = []

    for (let collection of collections) {

        if(collection.slug.startsWith('_')) {
            continue;
        }

        config.layout.props.sidebar.push({
            icon: 'database',
            href: '/admin/content/' + collection.slug,
            title: collection.name,
            visible: collection.sidebar
        });

        const collectionFormFields = collection.fields.map((x) => ({ label: x.name, ...x }));

        const collectionTableFields = collection.fields.map((x) => {
            x.label ??= x.name;

            if (x.type === 'plain_text') {
                x.type = 'text';
            }

            if (x.type === 'select') {
                x.type = 'badge';
            }

            return x;
        });

        const contentListPage = {
            slug: 'admin/content/' + collection.slug,
            title: collection.name,
            layout: config.layout,
            modules: [
                page({
                    title: collection.name,
                    hasBack: false,
                    actions: [
                        {
                            text: 'Add New Item',
                            color: 'primary',
                            icon: 'plus',
                            href: '/admin/content/' + collection.slug + '/create'
                        }
                    ],
                    content: [
                        table(collection.slug, collectionTableFields, [
                            'remove',
                            {
                                color: 'primary',
                                icon: 'edit',
                                href: '/admin/content/' + collection.slug + '/{id}'
                            }
                        ])
                    ]
                })
            ]
        };

        const contentCreatePage = {
            slug: 'admin/content/' + collection.slug + '/create',
            title: 'Add ' + collection.name,
            layout: config.layout,
            modules: [
                page({
                    title: 'Add ' + collection.name,
                    hasBack: true,
                    actions: [],
                    content: [
                        form(collectionFormFields, ['cancel'], {
                            color: 'primray',
                            action: collection.slug + ':insert',
                            text: 'Create',
                        }, '', true)
                    ],
                })
            ]
        };
        const contentUpdatePage = {
            slug: 'admin/content/' + collection.slug + '/{id}',
            title: 'Update ' + collection.name,
            layout: config.layout,
            modules: [
                page({
                    title: 'Update ' + collection.name,
                    actions: [],
                    hasBack: true,
                    content: [
                        form(
                            collectionFormFields,
                            [],
                            {
                                color: 'primray',
                                action: collection.slug + ':update',
                                text: 'Update'
                            },
                            collection.slug + ':id:=:id',
                            true
                        )
                    ],
                })
            ]
        };
        pages.push(contentListPage);
        pages.push(contentCreatePage);
        pages.push(contentUpdatePage);
    }

    return {
        pages,
    }
}
