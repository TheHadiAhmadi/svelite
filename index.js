import {render} from './server/server.js'
import {readFileSync} from 'fs'
import express from 'express'
import sirv from 'sirv'

const app = express()

app.use(sirv('./client'))

app.use('/', async (req, res) => {
    const template = readFileSync('./client/.svelite/index.html', 'utf-8')
    const url = new URL(req.protocol + "://" + req.headers.host + req.url)
    const result = await render({request: req, url, method: req.method, template})
    
    let response = typeof result === 'object' ? JSON.stringify(result) : result

    res.end(response)
})

app.listen(3000)

