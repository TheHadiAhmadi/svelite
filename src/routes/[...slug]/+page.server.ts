import api from '$lib/api.js'

export async function load({params, fetch}) {

    const page = await api('pages').find().filter('slug', '=', params.slug).first().then(res => res.data)

    console.log(page, params.slug)

        page.modules1 = [
            {
                name: 'Header', 
                props: {
                    text: "Hello" 
                }
            }
        ]
    const page2 = {
        title: 'Some Page',
        modules: [
            {
                name: 'Header', 
                props: {
                    text: "Hello" 
                }
            }
        ]
    }
    return {

        page,
    }
}
