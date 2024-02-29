import { render } from "svelte/server";
import { loadPageData, normalizeConfig } from "./svelite";
import SvLayout from './components/SvLayout.svelte'

function handlePage(page, template) {
  const { html, head } = render(SvLayout, {
    props: {
      page,
    },
  });

  const ssr = `<script type="application/json" id="svelite-ssr">${JSON.stringify({page})}</script>`

  return {
    status: 200,
    body: template.replace("<!--head-->", head).replace("<!--body-->", html).replace('<!--script-->', ssr),
    headers: {
      "Content-Type": "text/html",
    },
  };
}

async function handleRoute(route, request) {
  // static 
  const method = route[request.method ?? 'GET']

  if (!method) {
    return {
      status: 405,
      body: 'Method or route not found'
    }
  }

  try {
    const response = await method(request)
    return response
  } catch (err) {
    console.log(err)
    return {}
  }
}

function handle404() {
  return { body: '404' }
}

function handleRedirect(path, status) {
  return {
    status,
    headers: {
      Location: path
    }
  }
}
function handleError(err) {
  return {
    status: 500,
    body: err.message
  }
}

export async function respond(configObject, ctx) {
  const url = ctx.url
  const template = ctx.template;

  try {

  const config = normalizeConfig(configObject);

  const { page, route, params, redirect } = await loadPageData(url, config);

  if(redirect) {
    return handleRedirect(redirect.path, redirect.status ?? 302)
  }
  
  if (page) {
    const res = handlePage(page, template)
    return res
  }
  if (route) {
    if (config.$db) {
      if (config.$db.token) {
        ctx.request.db = sveliteDb(config.$db.token, config.$db.base_url)
      } else {
        ctx.request.db = memoryDb(config.$db.initial_data ?? {})
      }
    }
    ctx.request.params = params
    return handleRoute(route, ctx.request);
  }
  return handle404()
} catch(err) {
  console.log(err)
  return handleError(err)

}



}

function memoryDb(initialData = {}) {
  const _data = initialData

  return (table = "") => {
    return {

      async query({ filters, page, perPage }) {
        if (!_data[table]) return []

        return {
          data: _data[table]
        }

      },
      async insert(data) {

        _data[table] ??= []
        _data.id = "id_" + Math.random()
        _data[table].push(data)

        return data
      },
      async update(data) {

        if (!_data[table]) {
          return;
        }

        _data[table] = _data[table].map(x => {

          if (x.id === data.id)
            return { ...x, ...data }

          return x
        })

        return { todo: true }

      },
      async remove(id) {
        if (!_data[table]) return;

        _data[table] = _data[table].filter(x => x.id !== id)
        return true
      }
    }
  }
}

export function sveliteDb(token, base_url) {
  return (table = "") => {
    async function call(path, body) {

      const response = await fetch(`${base_url}/${token}/${table}/${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(res => res.json())
      return response;
    }

    return {
      async query({ filters, page, perPage }) {
        return call('query', { filters, page, perPage })
      },
      async insert(data) {
        return call('insert', data)
      },
      async update(data) {
        return call('update', data)
      },
      async remove(id) {
        return call('remove', { id })
      }
    }
  }
}

