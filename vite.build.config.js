import path from 'path'
import {svelte} from '@sveltejs/vite-plugin-svelte'

export default {
    plugins: [svelte()],
    build: {
        ssr: true,
        rollupOptions: {
         input: {
                svelite: path.resolve('./src/lib/svelite'),
                client: path.resolve('./src/lib/client'),
                server: path.resolve('./src/lib/server'),
                vite: path.resolve('./src/lib/vite'),
          },
        }
    }
}
