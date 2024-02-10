import modules from "./modules/index.js";
import layouts from "./layouts/index.js";
import {form, page, table} from "../../helpers/index.js";

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

    const roleForm = (mode = 'create') => form(
        [
            {
                name: 'name',
                label: 'Name',
                type: 'plain_text',
            },
            {
                name: 'description',
                label: 'Description',
                type: 'plain_text'
            },
            {
                name: 'permissions',
                label: 'Permissions',
                tab: 'Permissions'
            }
        ], 

        [], 
        {
            color: 'primary', 
            action: mode === 'create' ? "_roles:insert": "_roles:update", 
            text: 'Submit'
        }, 
        mode === 'create' ? "" : '_roles:id:=:id', 
        true, 
        ['General', "Permissions"])

    const roleCreate = {
        slug: adminPrefix + '/roles/create',
        title: "Create Role",
        layout: config.layout,
        modules: [
            page({title: "Create Role", actions: [], content: [
                roleForm('create')
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
            page({title: "Users", actions: [
                {text: "Add User", icon: 'plus', color: 'primary', href: `/${adminPrefix}/users/create`}
            ], content: [
                table('_users', [
                    {name: 'name', label: 'Name', type: 'text'},
                    {name: 'username', label: 'Username', type: 'text'},
                    {name: 'email', label: 'Email', type: 'text'},
                    {name: 'status', label: 'Status', type: 'badge'},
                ], ['remove', {icon: 'pencil', href: `/${adminPrefix}/users/{id}`, color: 'primary'}])
            ], hasBack: false})
        ]
    }

    const userFields = [
        {name: 'name', label: 'Name', type: 'plain_text', required: true},
        {name: 'email', label: 'Email', type: 'plain_text'},
        {name: 'profile', label: 'Profile', type: 'image'},
        {name: 'username', label: 'Username', tab: 'Account', type: 'plain_text', required: true},
        {name: 'password', label: 'Password', tab: 'Account', type: 'plain_text', required: true},
        {name: 'status', label: 'Status', type: 'select', placeholder: 'Choose status', items: [
            {key: "active", text:"Active"}, 
            {key: 'disabled', text: "Disabled"}
        ]},
    //

    ]

    const userUpdate = {
        slug: adminPrefix + '/users/{id}',
        layout: config.layout,
        title: "Edit User",
        modules: [
            page({title: "Create User", hasBack: true, actions: [], content: [
                form(userFields.filter(x=> x.name !== 'password'), [], {color: 'primary', text: "Update", action: "_users:update"}, "_users:id:=:id", true, ["General", "Account"]),
                form([
                    {name: 'password', label: 'Password', type: 'plain_text'}
                ], [], {
                    color: 'primary', 
                    text: "Change Password", 
                    action: "_users:update"
                }, "", true)
            ]})
        ]
    }
    // form([{name: 'password', label: 'Password', type: 'plain_text'}], [], {color: 'primary', text: "Change Password", action: "users:update"}, "", false,[]),

    const userCreate = {
        slug: adminPrefix + '/users/create',
        layout: config.layout,
        title: "Add User",
        modules: [
            page({title: "Add User", hasBack: true, actions: [], content: [
                form(userFields, [], {color: 'primary', text: "Add", action: "_users:insert"}, "", true, ["General", "Account"]),
            ]})
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
        pages = [...pages, userList, userCreate, userUpdate, roleCreate, roleList]

    }

    config.layout.props.sidebar.push({ icon: 'logout', title: 'Logout', href: '/auth/logout' });

    return {
        pages,
        modules,
        layouts
    }

}
