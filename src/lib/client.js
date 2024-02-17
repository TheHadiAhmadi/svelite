import { normalizeConfig, loadPageData} from "./svelite"
import { createRoot } from "svelte"

export default async function (configObject, SvLayout) {
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
