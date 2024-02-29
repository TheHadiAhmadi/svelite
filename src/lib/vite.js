import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import express from 'express'
import path from "path";
import { readFileSync, existsSync } from "fs";
import { normalizeConfig } from "./svelite.js";
import { removeServerCode } from "./helpers.js";

export function svelite(config = {}) {
  const configFile = config.configFile ?? "./svelite.config.js";

  let sveliteConfig;

  const plugin = {
    name: "svelite",
    config() {
      return {
        resolve: {
          alias: {
            '$modules': path.resolve('./modules'),
            '$plugins': path.resolve('./plugins'),
          },
        },
        ssr: {
          noExternal: ['svelitecms']
        },
      };
    },
    async configureServer(vite) {
      const template = readFileSync("./.svelite/index.html", "utf-8");

      vite.middlewares.use(express.json())
      vite.middlewares.use("/", async (req, res, next) => {
        const urlpath = req.url.split("?")[0]

        if (existsSync("." + urlpath) && req.url !== '/') return next();
        // TODO: find better ways
        if (urlpath.startsWith("/@fs")) return next();
        if (urlpath.startsWith("/favicon.ico")) return next();
        if (urlpath.startsWith("/@vite")) return next();

        // TODO:
        if (req.url.endsWith('.css')) return next()

        if (urlpath.includes('svelite.server') && req.method === 'GET') {
          return res.end('export default {routes: {}}');
        }

        if (!sveliteConfig) {
          const configModule = await vite.ssrLoadModule(configFile);
          sveliteConfig = normalizeConfig(configModule.default);
        }

        const { render } = await vite.ssrLoadModule(
          path.resolve(".svelite/server.js")
        );

        const protocol = req.connection.encrypted ? 'https' : 'http'
        const url = new URL(protocol + '://' + req.headers.host + req.url)
        let result = await render({ request: req, url, method: req.method, template });

        if (!result) result = {}


        console.log("Status: ", result.status);
        console.log("Headers: ", result.headers);
        // console.log("Body: ", result.body);

        if (result.raw) {
          return res.end(result.raw);

        }
        res.writeHead(result.status ?? 200, result.headers ?? {})
        return res.end(typeof result.body === 'object' ? JSON.stringify(result.body) : result.body);
      });
      // find current page
      // render page component
    },
    transform(code, id, {ssr} = {ssr: false}) {
      if(ssr) return code;

      if (existsSync(id) && (id.endsWith('.js') || id.endsWith('.ts')) && !id.includes('node_modules')) {
        return removeServerCode(code)
      }
    }
  };

  return [
    svelte({
      preprocess: vitePreprocess(),
    }),
    plugin,
  ];
}
