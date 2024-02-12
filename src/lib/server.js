import { render } from "svelte/server";
import { loadPageData, normalizeConfig } from "./svelite";
import SvLayout from './components/SvLayout.svelte'

async function handleServer(serverConfig, request) {
    if(serverConfig?.routes) {
        // find matching server route
        //
        // static 
        for(let route in serverConfig.routes) {
            if(route === request.url) {
                const mapping = {
                    'post': 'POST',
                    'POST': 'POST',

                    'get': 'GET',
                    'GET': 'GET',
                }

                const response = await serverConfig.routes[route][mapping[request.method ?? 'GET']](request)
                return response
            }
        }
    }
    return null
}
// TODO: Handle api requests
export async function respond(configObject, ctx) {
    const url = ctx.url
    const template = ctx.template;
    const method = ctx.method

  const config = normalizeConfig(configObject);
  const { page } = await loadPageData(url, config);

  if (!page || (method !== 'GET')) return handleServer(ctx.server, ctx.request);
  

    console.log(page)
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
