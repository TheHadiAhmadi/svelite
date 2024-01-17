import {svelte, vitePreprocess} from '@sveltejs/vite-plugin-svelte'
import path from 'path'
import {readFileSync} from 'fs'
import { normalizeConfig } from './svelite';

export function svelite(config = {}) {
    const configFile = config.configFile ?? './svelite.config.js'

    let sveliteConfig;

    const plugin = {
        name: 'svelite',
        config() {
            return {
                resolve: {
                    alias: {

                    }
                },
                build: {
                    rollupOptions: {
                        input: ".svelite/index.html"
                    }
                }
            }
        },
        async configureServer(vite) {
            const configModule = await vite.ssrLoadModule(configFile)
            sveliteConfig = normalizeConfig(configModule.default)
            console.log('config: ', sveliteConfig)
            const template = readFileSync('./.svelite/index.html', 'utf-8')
            
            vite.middlewares.use('/', async (req, res, next) => {
                const {render} = await vite.ssrLoadModule(path.resolve('.svelite/server.js'))

                const result = await render({url: req.url, template, config: sveliteConfig})

                if(!result) {
                    return next()
                }

                return res.end(result)
            })
            // find current page
            // render page component
        },
    }

    return [
        svelte({
            preprocess: vitePreprocess()
        }), 
        plugin
    ]
}

