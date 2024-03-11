import config from '../svelite.config.js'

import { render as renderSvelte } from 'svelte/server'
import { respond } from 'svelitecms/server'
import {SvLayout} from 'svelitecms/components'

export async function render(ctx) {
    return respond(config, ctx, renderSvelte, SvLayout)
}