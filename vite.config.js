import path from 'path'
import { svelite } from './dist/vite'

export default {
    resolve: {
        alias: {
            'svelitecms/vite': path.resolve('./dist/vite'),
            'svelitecms/client': path.resolve('./dist/client'),
            'svelitecms/server': path.resolve('./dist/server'),
            'svelitecms': path.resolve('./dist/svelite'),
        }
    },
    plugins: [
        svelite()
    ], 
}

