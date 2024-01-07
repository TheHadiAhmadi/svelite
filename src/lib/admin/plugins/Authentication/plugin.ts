import modules from "./modules";
import layouts from "./layouts";
import {page, table} from "$lib/admin/helpers";

export default (config) => {
    const authPrefix = config.authPrefix ?? 'auth'
    const adminPrefix = config.adminPrefix ?? 'admin'

    const hasUserManagement = config.userManagement !== false;
    const collections = config.collections ?? []

    const authLayout = {
        name: 'AuthLayout',
        props: {}
    }

    const loginPage = {
        slug: authPrefix + '/login',
        title: 'Login',
        layout: authLayout,
        modules: [{ name: 'Login', props: {} }]
    };

    const registerPage = {
        slug: authPrefix + '/register',
        title: 'Register',
        layout: authLayout,
        modules: [{ name: 'Register', props: {} }]
    };

    const roleCreate = {
        slug: adminPrefix + '/roles/create',
        title: "Create Role",
        layout: config.layout,
        modules: [
            page({title: "Create Role", actions: [], content: [
                {
                    name: "RoleEditor",
                    props: {
                        collections: config.collections
                    }
                }
            ],
            hasBack: true
            })
        ]
    }

    const userList = {
        slug: adminPrefix + '/users',
        title: "Users",
        layout: config.layout,
        modules: [
            page({title: "Users", actions: [], content: [
                table('_users', [
                    {name: 'name', label: 'Name', type: 'plain_text'},
                    {name: 'status', label: 'Status', type: 'badge'},
                    {name: 'username', label: 'Username', type: 'plain_text'},
                    {name: 'email', label: 'Email', type: 'plain_text'}
                ], ['remove'])
            ], hasBack: false})
        ]
    }

    const roleList = {
        slug: adminPrefix + '/roles',
        title: "Roles",
        layout: config.layout,
        modules: [
            page({
                title: "Roles", 
                actions: [
                    {
                        color: 'primary',
                        text: "Create Role",
                        icon: "plus",
                        href: '/' + roleCreate.slug
                    }
                ], 
                content: [
                    table('_roles', [
                        {name: 'name', label: 'Name', type: 'plain_text'},
                        {name: 'description', label: 'Description', type: 'plain_text'}
                    ], ['remove'])
                ], 
                hasBack: false
            })
        ]


    }





    // forgot password
    //
    let pages = [registerPage, loginPage]

    if(hasUserManagement) {
        config.layout.props.sidebar.push({
            icon: 'users',
            title: 'User Management',
            submenu: [
                { title: 'Users', href: '/admin/users' },
                { title: 'Roles', href: '/admin/roles' },
            ]
        })
        pages = [...pages, userList, roleCreate, roleList]

    }

    config.layout.props.sidebar.push({ icon: 'logout', title: 'Logout', href: '/auth/logout' });

    return {
        pages,
        modules,
        layouts
    }

}
