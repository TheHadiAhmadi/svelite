import api from "$lib/api"
import modules from "$lib/ui"
import type {PageLoadEvent} from "./$types"

export async function load({params, data}: PageLoadEvent) {

    const page = await api('pages').find().filter('slug', '=', params.slug).first().then(res => res.data)


    for(let module of page.modules) {
        if(modules[module.name].load) {
            module.props.data = await modules[module.name].load(module.props)

            for(let key in module.props.data) {
                if(typeof module.props.data[key] === 'function') {
                    const fn = module.props.data[key]
                    if(fn.constructor.name === 'AsyncFunction') {

                        module.props.data[key] = async (...args) => {
                            const result = await fn(...args)

                            location.reload()
                            return result
                        }
                        
                    } else {
                        module.props.data[key] = (...args) => {
                            const result = fn(...args)
                            location.reload()

                            return result
                        }

                    }


                }

            }
        }
    }

    return {
        page,
    }
}
