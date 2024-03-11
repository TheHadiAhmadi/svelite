import config from '../svelite.config.js'
import {hydrate} from 'svelte'
import {SvLayout} from 'svelitecms/components'
import init from 'svelitecms/client'

init(config, hydrate, SvLayout)
