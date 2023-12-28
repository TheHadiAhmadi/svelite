export default {
    title: 'Hadi Ahmadi',
    logo: '/logo.png',
    collections: [
        {
            slug: "projects",
            name: "Projects",
            fields: [
                {name: "Project Name", type: "plain_text"},
                {name: "Description", type: "rich_text" },
                {name: "Image", type: "image" },
                {name: "Screenshots", type: "image", multiple: true}
            ]
        },
        {
            slug: "users",
            name: "Users",
            fields: [
                {name: "Name", type: "plain_text"},
                {name: "Username", type: "plain_text"},
                {name: "Active", type: "switch"},
                {name: "Rolw", type: "select", items: [
                    {key: "0", text: "Admin"},
                    {key: "1", text: "Editor"}, 
                    {key: "2", text: "Developer"}
                ]}
            ]
        }
    ],
    theme: {
        colors: {
            'primary': 'blue',
            'secondary': 'gray',
        }
    }
}
