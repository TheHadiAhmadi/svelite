import path from 'path'
export default {
    resolve: {
        alias: {
            'svelitecms/client': path.resolve('./dist/client.js'),
            'svelitecms/db': path.resolve('./dist/db.js'),
            'svelitecms/vite': path.resolve('./dist/vite.js'),
            'svelitecms/server': path.resolve('./dist/server.js'),
            svelitecms: path.resolve('./dist/svelite.js'),
        }
    }
}