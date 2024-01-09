import { sveltekit } from "@sveltejs/kit/vite";
import path from 'path'

export default {
        plugins: [sveltekit()],
        server: {fs: {strict: false}},
        css: {
            postcss: path.resolve('node_modules/svelitecms/dist/postcss.config.js')
        },
}
