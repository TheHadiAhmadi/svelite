import {render} from './server/server.js'
import {readFileSync} from 'fs'

export default async (req, res) => {
    let chunks = '';

    req.on('data', (value) => chunks += value.toString())
    req.on('end', async () => {
        req.body = JSON.parse(chunks || '{}')

        const template = readFileSync('./index.html', 'utf-8')

        const protocol = req.connection.encrypted ? 'https' : 'http'
        const url = new URL(protocol + "://" + req.headers.host + req.url)
        const result = await render({request: req, url, method: req.method, template})
        
        let response = typeof result?.body === 'object' ? JSON.stringify(result.body) : (result?.body ?? '')

        res.end(response)
    })
}