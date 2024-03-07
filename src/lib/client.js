import { normalizeConfig, loadPageData} from "./svelite"
import { hydrate } from "svelte"

export default async function (configObject, SvLayout) {
    const config = await normalizeConfig(configObject)

    const {page} = await loadPageData(window.location, config)

    const target = document.getElementById("app")

    const ssr = JSON.parse(document.getElementById('svelite-ssr').textContent)
    
    const options = {
        target,
        props: {
            page: {...page, ...ssr},
            async load(url) {
                console.log('load: ', url, config)
                const result = await loadPageData(url, config)

                console.log(result)

                return result.page
            }
        }
    }

    hydrate(SvLayout, options)
}
