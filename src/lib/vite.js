import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import express from 'express'
import path from "path";
import { readFileSync, existsSync } from "fs";
import { normalizeConfig } from "./svelite.js";

export function svelite(config = {}) {
  const configFile = config.configFile ?? "./svelite.config.js";

  console.log("plugin init");
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
      console.log("configure middleware");

      vite.middlewares.use(express.json())
      vite.middlewares.use("/", async (req, res, next) => {
        const urlpath = req.url.split("?")[0]
        console.log("request: ", req.url, existsSync("." + urlpath));


        if (existsSync("." + urlpath) && req.url !== '/') return next();
        console.log("passed one");
        // TODO: find better ways
        if (urlpath.startsWith("/@fs")) return next();
        if (urlpath.startsWith("/favicon.ico")) return next();
        console.log("passed two");
        if (urlpath.startsWith("/@vite")) return next();
        console.log("passed three");

        if (urlpath.includes('svelite.server') && req.method === 'GET') {
          return res.end('export default {routes: {}}');
        }

        if (!sveliteConfig) {
          const configModule = await vite.ssrLoadModule(configFile);
          sveliteConfig = normalizeConfig(configModule.default);
          console.log("load config: ", sveliteConfig);
        }

        const { render } = await vite.ssrLoadModule(
          path.resolve(".svelite/server.js")
        );

        const protocol = req.connection.encrypted ? 'https' : 'http'
        const url = new URL(protocol + '://' + req.headers.host + req.url)
        const result = await render({ request: req, url, method: req.method, template });

        if (!result?.body && !result?.raw) {
          return next();
        }

        console.log("Headers: ", result.headers);
        console.log("Status: ", result.status);

        if (result.raw) {
          return res.end(result.raw);

        }
        res.writeHead(result.status ?? 200, result.headers ?? {})
        return res.end(typeof result.body === 'object' ? JSON.stringify(result.body) : result.body);
      });
      // find current page
      // render page component
    }
  };

  return [
    svelte({
      preprocess: vitePreprocess(),
    }),
    plugin,
  ];
}
