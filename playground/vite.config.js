import path from 'path'
import {svelite} from 'svelitecms/vite'

console.log('vite config')
export default {
    plugins: [
//         svelite()
    ],
    resolve: {
        alias: {
            "$admin": path.resolve('./plugins/admin'),

        }
    },

}
