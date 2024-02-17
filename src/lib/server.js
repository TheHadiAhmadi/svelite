import { render } from "svelte/server";
import { loadPageData, normalizeConfig } from "./svelite";
import SvLayout from './components/SvLayout.svelte'

async function handlePage(page, template) {
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

async function handleRoute(route, request) {
    // static 
    const method = route[request.method ?? 'GET']

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

function handle404() {
  return {body: '404'}
}

export async function respond(configObject, ctx) {
    const url = ctx.url
    const template = ctx.template;

      const config = normalizeConfig(configObject);
    config.routes = ctx.server?.routes ?? []

  const { page, route } = await loadPageData(url, config);

    if(page) {
        return handlePage(page, template)
    }
  if(route) {
      if(ctx.server.db) {
          ctx.request.db = sveliteDb(ctx.server.db.token, ctx.server.db.base_url)
          console.log(ctx.request.db)
      }
      return handleRoute(route, ctx.request);
  }
}

export function sveliteDb(token, base_url) {
    return (table = "") => {
        return {
            async query({filters, page, perPage}) {
                console.log('query', {base_url, token, table, filters, page, perPage})
                
                return fetch(`${base_url}/${token}/${table}/query`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({filters, page, perPage})
                }).then(res => res.json())
            },
            async insert(data) {
                console.log('insert', {base_url, token, table, data})
                const res = await fetch(`${base_url}/${token}/${table}/insert`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json())
                console.log(res)
            },
            async update(data) {
                console.log('update', {base_url, token, table, data})
                return fetch(`${base_url}/${token}/${table}/update`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json())
            },
            async remove(id) {
                console.log('remove', {base_url, token, table, id})
                return fetch(`${base_url}/${token}/${table}/update`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id})
                }).then(res => res.json())
            }
        }
    }
}

