import { normalizeConfig, loadPageData} from "./svelite"
import {createRoot} from 'svelte'

export default async function (configObject, SvPage) {
    const config = normalizeConfig(configObject)
    // TODO: if not window 
    const path = window.location.pathname
    const {page} = await loadPageData(path, config)

    const target = document.getElementById("app")
    console.log(target.innerHTML)
    
    const options = {
        target,
        props: {
            page
        }
    }

    console.log('calling createRoot', options)
    const res = createRoot(SvPage, options)
    console.log('res: ', res)
}
