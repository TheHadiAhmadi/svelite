import { normalizeConfig, loadPageData} from "./svelite"
import {createRoot} from 'svelte'
import SvLayout from './components/SvLayout.svelte'

export default async function (configObject) {
    const config = normalizeConfig(configObject)

    const {page} = await loadPageData(window.location, config)

    const target = document.getElementById("app")
    
    const options = {
        target,
        props: {
            page
        }
    }

    createRoot(SvLayout, options)
}
