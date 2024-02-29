import { normalizeConfig, loadPageData} from "./svelite"
import { hydrate } from "svelte"

export default async function (configObject, SvLayout) {
    const config = normalizeConfig(configObject)

    await loadPageData(window.location, config)

    const target = document.getElementById("app")

    const {page} = JSON.parse(document.getElementById('svelite-ssr').textContent)
    
    const options = {
        target,
        props: {
            page
        }
    }

    hydrate(SvLayout, options)
}
