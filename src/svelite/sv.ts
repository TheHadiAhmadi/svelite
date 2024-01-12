import {createSvelite} from './index.js'
import config from '$config'

export default createSvelite({
    plugins: config.plugins,
    modules: config.modules,
    pages: config.pages,
    layouts: config.layouts,
    api: config.api
})
