import config from '../admin.config'

export function handle({event, resolve}) {
    event.locals.config = config

    return resolve(event)
}
