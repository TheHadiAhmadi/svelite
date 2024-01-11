import { sveltekit } from "@sveltejs/kit/vite";
import path from 'path'

export default (config) => ({
        ...config,
        plugins: [...(config?.plugins ??[]), sveltekit()],
        server: {
            ...(config?.server ?? {}),
            fs: {
                ...(config?.server?.fs ?? {}),
                strict: false
            }
        },
        css: {
            ...(config?.css ?? {}),
            postcss: path.resolve('node_modules/svelitecms/dist/config/postcss.config.js')
        },
})
