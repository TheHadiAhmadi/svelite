import modules from "./modules"
import layouts from "./layouts"
import PageModules from "./components/PageModules.svelte"

function getAdminPages(config: any) {
    const adminPrefix = config.adminPrefix ?? 'admin'
    const authPrefix = config.authPrefix ?? 'auth'

    const hasContentManagement = config.contentManagement !== false
    const hasContentTypeManagement = config.contentTypeManagement !== false
    const hasPageManagement = config.pageManagement !== false
    const hasAuthPages = config.authPages !== false
    const hasDashboard = config.dashboard !== false;
    const collections = config.collections ?? []

    let adminLayout = {
        name: "AdminLayout",
        props: {
            theme: "light",
            dir: "rtl"
        }
    }

    let pages: any[] = []

    if(hasContentTypeManagement) {
        // build dynamic tables (collections + custom tables)... 
        // and dynamic routes for 
    }

    if(hasContentManagement) {
        // crud for tables (collections)...

    }

    function page(title = "page", actions: any[] = [], content: any[] = []) {
        return {
            name: 'Page',
            props: {
                title,
                actions,
                content
            }
        }
    }

    function table(collection = '', columns: any[] = [], actions: any[] = []) {
        return {
            name: "Table",
            props: {
                collection,
                columns,
                actions
            }
        }
    }

    if(hasPageManagement) {
        // /admin/files routes and upload/edit/remove from admin panel
        const listPage = {
            slug: adminPrefix + '/pages',
            layout: adminLayout,
            modules: [
                page("Page List", [
                    {text: 'Create Page', color: 'primary', icon: 'plus', href: '/' + adminPrefix + '/pages/create'}
                ], [
                    table('pages', [
                        {type: 'text', name: 'Title', field: 'title'},
                        {type: 'text', name: 'Slug', field: 'slug'},

                    ], ['remove', {href: '/pages/{slug}', icon: 'edit'}])
                ]),
            ]
        }

        const createPage = {
            slug: adminPrefix + '/pages/create',
            layout: adminLayout,
            modules: [
                page("Create Page", ['back'], [

                    {
                        name: 'Form',
                        props: {
                            collection: "pages",
                            fields: [
                                {name: 'title', type: 'plain_text'},
                                {name: 'slug', type: 'plain_text'},
                                {name: 'modules', type: 'custom', component: PageModules, props: {modules}},
                            ],
                            actions: [
                                "cancel",
                            ],
                            submit: {
                                color: 'primray',
                                action: "pages:insert",
                                text: "Create"

                            }

                        }
                    }
                ])
            ]

        }

        const editPage = {

        }

        pages.push(listPage)
        pages.push(createPage)
        pages.push(editPage)
    }

    if(hasAuthPages) {
        const loginPage = {
            slug: authPrefix + '/login',
            title: 'Login',
            layout: {name: "AuthLayout", props: {}},
            modules: [
                {name: "Login", props: {}}
            ]
        }
        console.log({authPrefix})
        pages.push(loginPage)
        // /auth/login
        // /auth/register
        // /auth/forgot
    }

    if(hasDashboard) {
        // /admin route
    }

    
    pages.push({})

    return pages
}

export function AdminPanelPlugin(config: any) {

    const pages = getAdminPages(config) 

    return {
        modules,
        pages,
        layouts
    }
}
