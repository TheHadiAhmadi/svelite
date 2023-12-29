export default {
    title: 'Nancy Saedi',
    logo: '/logo.png',
    collections: [
        {
            slug: "neighbourhoods",
            name: "Neighbourhoods",
            fields: [
                {name: "Project Name", type: "plain_text"},
                {name: "Description", type: "rich_text" },
                {name: "Image", type: "image" },
                {name: "Screenshots", type: "image", multiple: true}
            ]
        },
        {
            slug: "properties",
            name: "Properties",
            fields: [
                {name: "name", type: "plain_text"},
                {name: "username", type: "plain_text"},
                {name: "active", type: "switch"},
                {name: "role", type: "select", items: [
                    {key: "0", text: "Admin"},
                    {key: "1", text: "Editor"}, 
                    {key: "2", text: "Developer"}
                ]}
            ]
        }
    ],
    pages: [
        {
            title: "Neighbourhoods", 
            slug: "neighbourhoods", 
            type: 'table',
            actions: [
                {text: "Create Neighbourhoods", color: 'primary', icon: "plus", href: "/admin/neighbourhood/create"}
            ],
            table: {
                collection: "users2", 
                filters: [],
                columns: [
                    { name: "ID", field: "id", type: 'text'},
                    { name: "Name", field: 'name', type: 'text'},
                    { name: "Username", field: 'username', type: 'text'},
                    { name: "Status", field: 'active', type: "badge"},
                ],
                actions: ["remove", {color: 'primary', icon: 'pencil', href: '/admin/users/{id}'}]
            }
        },
        {
            title: "Create Neighbourhoods",
            slug: "neighbourhood/create",
            type: "form",
            actions: [
                {color: 'default', icon: 'chevron-left', text: 'Back', href: '/admin/users'}
            ],
            form: {
                fields: [
                    {colSm: 6, label: 'Name', name: 'name', type: 'plain_text', required: true, placeholder: 'Enter user\'s name...'},
                    {colSm: 6, label: 'Username', name: 'username', type: 'plain_text', placeholder: 'Enter username...'},
                    {label: "Proflie", name: 'profile', type: 'image'},
                    {label: 'Active', name: 'active', type: 'switch'},
                ],
                onsubmit: 'neighbourhood:insert',
                actions: [
                    "cancel",
                    {text: "Save", color: 'primary', type: 'submit', action: "neighbourhood:insert"}
                ]
            }
        },
        {
            title: "Update User",
            slug: "users/{id}",
            type: "form",
            actions: [
                {color: 'default', icon: 'chevron-left', text: 'Back', href: '/admin/users'}
            ],
            form: {
                load: 'users2:id:=:id',
                fields: [
                    {colSm: 6, label: 'Name', name: 'name', type: 'plain_text', required: true, placeholder: 'Enter user\'s name...'},
                    {colSm: 6, label: 'Username', name: 'username', type: 'plain_text', placeholder: 'Enter username...'},
                    {label: "Proflie", name: 'profile', type: 'image'},
                    {label: 'Active', name: 'active', type: 'switch'},
                ],
                onsubmit: 'users2:update',
                actions: [
                    "cancel",
                    {text: "Save", color: 'primary', type: 'submit', action: "users2:update"}
                ]
            }
        }

    ],

    sidebar: [
        {title: 'Properties', href: '/admin/properties'},
        {title: 'Neighbourhoods', href: '/admin/neighbourhoods'},
    ],
    theme: {
        colors: {
            'primary': 'blue',
            'secondary': 'gray',
        }
    }
}
