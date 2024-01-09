import path from 'path'

export default (userConfig = {}) => {
    return {
        ...userConfig,
        kit: {
            ...userConfig.kit ?? {},
            files: {
                ...userConfig.kit?.files ?? {},
                routes: path.resolve('node_modules/svelitecms/dist/routes'),
                appTemplate: path.resolve('node_modules/svelitecms/dist/app.html')
            },
            alias: {
                ...userConfig.kit?.alias,
                '$svelite': path.resolve('./svelte.config')
            }
        }
    }
}
