import { normalizeConfig, loadPageData} from "./svelite"
import {createRoot} from 'svelte'
import SvPage from './components/SvPage.svelte'

export default async function (configObject) {
    const config = normalizeConfig(configObject)

    // TODO: if not window 
    const path = window.location.pathname

    const {page} = await loadPageData(path, config)

    const target = document.getElementById("app")
    
    const options = {
        target,
        props: {
            page
        }
    }

    createRoot(SvPage, options)
}
