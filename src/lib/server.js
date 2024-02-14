import { render } from "svelte/server";
import { loadPageData, normalizeConfig } from "./svelite";
import SvLayout from './components/SvLayout.svelte'

async function handleServer(routes, request) {
    // static 
    for(let route in routes) {
        if(route === request.url) {
            const mapping = {
                'post': 'POST',
                'POST': 'POST',

                'get': 'GET',
                'GET': 'GET',
            }

            const method = routes[route][mapping[request.method ?? 'GET']]

            if(!method) {
                return {
                    status: 405, 
                    body: 'Method or route not found'
                }
            }

            try {
                const response = await method(request)
                return response
            } catch(err) {
                console.log(err)
                return {}
            }
        }
    }
    return null
}

export async function respond(configObject, ctx) {
    const url = ctx.url
    const template = ctx.template;
    const method = ctx.method

  const config = normalizeConfig(configObject);
  const { page } = await loadPageData(url, config);

  if (!page || (method !== 'GET')) {
      if(ctx.server?.routes) {
          return handleServer(ctx.server.routes, ctx.request);
      }
  }

    if(!page) return {body: '404'}
  
  const { html, head } = render(SvLayout, {
    props: {
      page,
    },
  });

  return {
    status: 200,
    body: template.replace("<!--head-->", head).replace("<!--body-->", html),
    headers: {
      "Content-Type": "text/html",
    },
  };
}
