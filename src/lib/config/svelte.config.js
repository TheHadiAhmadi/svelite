import path from 'path'

export default (userConfig = {}) => {
    return {
        ...userConfig,
        kit: {
            ...userConfig.kit ?? {},
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
