import {render} from './server/server.js'
import {readFileSync} from 'fs'
import express from 'express'
import sirv from 'sirv'

const app = express()

app.use(sirv('./client'))
app.use(express.json())

app.use('/', async (req, res) => {
    const template = await readFileSync('./client/.svelite/index.html', 'utf-8')
    const url = new URL(req.protocol + '://' + req.headers.host + req.url)
    const result = await render({request: req, url, method: req.method, body: req.body, template})

    const response = typeof result?.body == 'object' ? JSON.stringify(result.body) : result?.body ?? ""
    
    res.end(response)
})

app.listen(3000, () => console.log('server started at localhost:' + 3000))