import {render} from './server/server.js'
import {readFileSync} from 'fs'
import express from 'express'
import sirv from 'sirv'

const app = express()

app.use(sirv('./client'))

app.use('/', async (req, res) => {
    const template = await readFileSync('./client/.svelite/index.html', 'utf-8')
    const result = await render({url: req.url, template})
    res.end(result)
})

app.listen(3000)

