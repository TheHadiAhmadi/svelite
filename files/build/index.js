import {render} from './server/server.js'
import {readFileSync} from 'fs'
import express from 'express'
import sirv from 'sirv'

const app = express()

app.use(sirv('./build/client'))
app.use(express.json())

app.use('/', async (req, res) => {
    const template = await readFileSync('./build/client/.svelite/index.html', 'utf-8')
    const url = new URL(req.protocol + '://' + req.headers.host + req.url)
    const result = await render({request: req, url, method: req.method, body: req.body, template})

	if(result?.raw) {
		res.end(result.raw)
	}

    const response = typeof result?.body == 'object' ? JSON.stringify(result.body) : result?.body ?? ""
    
    res.writeHead(response.status ?? 200, response.headers ?? {})

    res.end(response)
})

const {PORT = 3000} = process.env
app.listen(PORT, () => console.log('server started at localhost:' + PORT))
