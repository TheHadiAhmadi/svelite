import { normalizeConfig, loadPageData} from "./svelite"
import {createRoot} from 'svelte'

export default async function (configObject, SvPage) {
    const config = normalizeConfig(configObject)
    // TODO: if not window 
    const path = window.location.pathname
    const {page} = await loadPageData(path, config)


    console.log(page)
    const options = {
        target: document.getElementById("app"),
        props: {
            page
        }
    }
    console.log(options)

    createRoot(SvPage, options)

}
