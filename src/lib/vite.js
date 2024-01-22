import {svelte, vitePreprocess} from '@sveltejs/vite-plugin-svelte'
import path from 'path'
import {readFileSync} from 'fs'
import { normalizeConfig } from './svelite';
import { respond } from './server';

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
            const template = readFileSync('./.svelite/index.html', 'utf-8')

            vite.middlewares.use('/', async (req, res, next) => {

                // TODO: find better ways
                if(req.url.startsWith(configFile.slice(1))) return next()
                if(req.url.startsWith('/@fs')) return next()
                if(req.url.startsWith('/@vite')) return next()
                if(req.url.startsWith('/.svelite')) return next()
                if(req.url.includes('.js')) return next()
                if(req.url.includes('.mjs')) return next()
                if(req.url.includes('.css')) return next()
                if(req.url.includes('.svelte')) return next()
                if(req.url.includes('.ts')) return next()

                if(!sveliteConfig) {
                    const configModule = await vite.ssrLoadModule(configFile)
                    sveliteConfig = normalizeConfig(configModule.default)
                    console.log('load config: ', sveliteConfig)
                }

                const {render} = await vite.ssrLoadModule(path.resolve('.svelite/server.js'))

                const result = await render({url: req.url, template})

                if(!result.body) {
                    return next()
                }

                console.log('Headers: ', result.headers)
                console.log('Status: ', result.status)

                return res.end(result.body)
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

