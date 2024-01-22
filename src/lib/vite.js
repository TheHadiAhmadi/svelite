import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import { readFileSync, existsSync } from "fs";
import { normalizeConfig } from "./svelite";

export function svelite(config = {}) {
  const configFile = config.configFile ?? "./svelite.config.js";

  console.log("plugin init");
  let sveliteConfig;

  const plugin = {
    name: "svelite",
    config() {
      return {
        resolve: {
          alias: {},
        },
        ssr: {
          noExternal: ['svelitecms']
        },
        build: {
          rollupOptions: {
            input: ".svelite/index.html",
          },
        },
      };
    },
    async configureServer(vite) {
      const template = readFileSync("./.svelite/index.html", "utf-8");
      console.log("configure middleware");

      vite.middlewares.use("/", async (req, res, next) => {
        console.log("request: ", req.url, existsSync("." + req.url));

        if (existsSync("." + req.url.split("?")[0])) return next();
        console.log("passed one");
        // TODO: find better ways
        if (req.url.startsWith("/@fs")) return next();
        if (req.url.startsWith("/favicon.ico")) return next();
        console.log("passed two");
        if (req.url.startsWith("/@vite")) return next();
        console.log("passed three");

        if (!sveliteConfig) {
          const configModule = await vite.ssrLoadModule(configFile);
          sveliteConfig = normalizeConfig(configModule.default);
          console.log("load config: ", sveliteConfig);
        }

        const { render } = await vite.ssrLoadModule(
          path.resolve(".svelite/server.js")
        );

        console.log("render page");

        const result = await render({ url: req.url, template });

        if (!result.body) {
          return next();
        }

        console.log("Headers: ", result.headers);
        console.log("Status: ", result.status);

        return res.end(result.body);
      });
      // find current page
      // render page component
    },
  };

  return [
    svelte({
      preprocess: vitePreprocess(),
    }),
    plugin,
  ];
}
