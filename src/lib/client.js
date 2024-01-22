import { normalizeConfig, loadPageData} from "./svelite"
import {createRoot} from 'svelte'

export default async function (configObject) {
    const config = normalizeConfig(configObject)
    // TODO: if not window 
    const path = window.location.pathname
    const {page} = await loadPageData(path, config)

    import('./components/SvPage.svelte').then(module => {



    console.log(page)
    const options = {
        target: document.getElementById("app"),
        props: {
            page
        }
    }
    console.log(options)

    createRoot(module.default, options)
})

}
