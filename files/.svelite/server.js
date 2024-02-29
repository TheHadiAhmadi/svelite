import config from '../svelite.config.js'
import { respond } from 'svelitecms/server'

export async function render(ctx) {
    return respond(config, ctx)
}