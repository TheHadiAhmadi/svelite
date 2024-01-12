import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'
import path from 'path'
import adapterAuto from '@sveltejs/adapter-auto'
import adapterNode from '@sveltejs/adapter-node'
import adapterStatic from '@sveltejs/adapter-static'

const adapters = {
    auto: adapterAuto,
    static: adapterStatic,
    node: adapterNode
}

export default (userConfig = {}) => {
    const adapter = userConfig.adapter ?? 'auto'
    return {
        ...userConfig,
        preprocess: vitePreprocess(),
        kit: {
            ...userConfig.kit ?? {},
            adapter: adapters[adapter](),
            files: {
                ...userConfig.kit?.files ?? {},
                lib: path.resolve("plugins"),
                routes: path.resolve('node_modules/svelitecms/dist/routes'),
                appTemplate: path.resolve('node_modules/svelitecms/dist/app.html')
            },
            alias: {
                ...userConfig.kit?.alias,
                '$components': path.resolve('node_modules/svelitecms/dist/components'),
                '$config': path.resolve('./svelite.config')
            }
        }
    }
}
