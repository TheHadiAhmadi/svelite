import {svelte, vitePreprocess} from '@sveltejs/vite-plugin-svelte'
import path from 'path'

export default {
    resolve: {
        alias: {
            'svelitecms': path.resolve('./dist/svelite'),
            'svelitecms/vite': path.resolve('./dist/vite')
        }
    },
    plugins: [
        svelte({
            preprocess: vitePreprocess()
        })
//         svelite({
  //       })
    ], 
}

