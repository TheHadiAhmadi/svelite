import { render } from "svelte/server";
import { loadPageData, normalizeConfig } from "./svelite";
import SvLayout from './components/SvLayout.svelte'

function handlePage(page, template) {
  const { html, head } = render(SvLayout, {
    props: {
      page,
    },
  });

  const ssr = `<script type="application/json" id="svelite-ssr">${JSON.stringify({ page })}</script>`

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

    console.log(config)
    const { page, route, params, redirect } = await loadPageData(url, config);

    if (redirect) {
      return handleRedirect(redirect.path, redirect.status ?? 302)
    }

    if (page) {
      const res = handlePage(page, template)
      return res
    }
    if (route) {
      ctx.request.params = params
      console.log(config.$ctx)
      ctx.request = {...config.$ctx, ...ctx}

      return handleRoute(route, ctx.request);
    }
    return handle404()
  } catch (err) {
    console.log(err)
    return handleError(err)

  }
}
