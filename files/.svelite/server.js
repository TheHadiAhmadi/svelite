import config from '../svelite.config.js'
import { respond } from 'svelitecms/server'

export async function render(ctx) {
    try {
        const module = await import('../svelite.server.js')
        if(module.default) {
            ctx.server = module.default
        }
    } catch(err) {
        //
    }

    return respond(config, ctx)
}