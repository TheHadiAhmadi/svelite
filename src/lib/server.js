import { render } from "svelte/server";
import { loadPageData, normalizeConfig } from "./svelite";
import SvLayout from './components/SvLayout.svelte'

function handlePage(page, template) {
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

  if (!method) {
    return {
      status: 405,
      body: 'Method or route not found'
    }
  }

  try {
    const response = await method(request)
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
    return {}
  }
}

function handle404() {
  return { body: '404' }
}

export async function respond(configObject, ctx) {
  const url = ctx.url
  const template = ctx.template;

  const config = normalizeConfig(configObject);
  config.routes = ctx.server?.routes ?? []

  const { page, route, params } = await loadPageData(url, config);

  if (page) {
    console.log({ template })
    const res = handlePage(page, template)
    console.log('res: ', res)
    return res
  }
  if (route) {
    if (ctx.server.db) {
      if (ctx.server.db.token) {
        ctx.request.db = sveliteDb(ctx.server.db.token, ctx.server.db.base_url)
      } else {
        ctx.request.db = memoryDb(ctx.server.db.initial_data ?? {})
      }
    }
    ctx.request.params = params
    return handleRoute(route, ctx.request);
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
      console.log('db: ', path, body)

      const response = await fetch(`${base_url}/${token}/${table}/${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(res => res.json())
      console.log({ response })
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

