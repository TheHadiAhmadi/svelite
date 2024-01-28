import { render } from "svelte/server";
import { loadPageData, normalizeConfig } from "./svelite";

// TODO: Handle api requests
export async function respond(configObject, ctx) {
  const url = ctx.url;
  const template = ctx.template;

  const config = normalizeConfig(configObject);
  const { page } = await loadPageData(url, config);

  if (!page) return null;
  
  const { html, head } = render(ctx.SvPage, {
    props: {
      page,
    },
  });

  console.log({html, head, page})

  return {
    status: 200,
    body: template.replace("<!--head-->", head).replace("<!--body-->", html),
    headers: {
      "Content-Type": "text/html",
    },
  };
}
