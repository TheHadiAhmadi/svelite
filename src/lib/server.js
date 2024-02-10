import { render } from "svelte/server";
import { loadPageData, normalizeConfig } from "./svelite";
import SvPage from './components/SvPage.svelte'

async function handleServer(url, method, serverConfig) {
    if(serverConfig?.routes) {
        // find matching server route
        //
        // static 
        for(let route in serverConfig.routes) {
            if(route === url) {
                const mapping = {
                    'post': 'POST',
                    'POST': 'POST',

                    'get': 'GET',
                    'GET': 'GET',
                }

                const request = {
                    url,
                    method,
                    params: {},  // TODO
                    body: {a: 1} // TODO

                }

                const response = await serverConfig.routes[route][mapping[method ?? 'GET']](request)
                return response
            }
        }
    }
    return null
}
// TODO: Handle api requests
export async function respond(configObject, ctx) {
  const url = ctx.url;
  const template = ctx.template;
    const method = ctx.method

  const config = normalizeConfig(configObject);
  const { page } = await loadPageData(url, config);

  if (!page || (method !== 'GET')) return handleServer(url, ctx.method, ctx.server);
  
  const { html, head } = render(SvPage, {
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
