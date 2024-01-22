import { normalizeConfig, loadPageData} from "./svelite"
import {createRoot} from 'svelte'
import SvPage from './components/SvPage.svelte'

export default async function (configObject) {
    const config = normalizeConfig(configObject)

    // TODO: if not window 
    const path = window.location.pathname

    const {page} = await loadPageData(path, config)

    createRoot(SvPage, {
        target: document.getElementById("app"),
        props: {
            page
        }
    })
}
