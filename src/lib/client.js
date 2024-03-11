import { normalizeConfig, loadPageData} from "./svelite"

export default async function (configObject, hydrate, SvLayout) {
    const config = await normalizeConfig(configObject)

    const {page} = await loadPageData(window.location, config)

    const target = document.getElementById("app")
    
    const options = {
        target,
        props: {
            page,
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
