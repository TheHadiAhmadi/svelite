import {render} from 'svelte/server'
import {loadPageData, normalizeConfig} from './svelite'

// TODO: Handle api requests 
export async function respond(configObject, ctx) {
    const url = ctx.url
    const template = ctx.template

    const config = normalizeConfig(configObject)
    const page = await loadPageData(url, config)

    console.log({page})
    if(!page) return null;
    return import ('./components/SvPage.svelte').then(module => {
        const {html, head} = render(module.default, {
            props: {
                page
            }
        })

        console.log({html, head})

        return {
            status: 200,
            body: template.replace('<!--head-->', head).replace('<!--body-->', html),
            headers: {
                'Content-Type': 'text/html'
            }
        }
    })

}
