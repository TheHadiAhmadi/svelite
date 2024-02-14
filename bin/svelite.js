#!/usr/bin/env node
import {svelte} from '@sveltejs/vite-plugin-svelte'
import {svelite} from 'svelitecms/vite'

import { existsSync, mkdirSync, writeFileSync, renameSync} from 'fs'
import {readdir} from 'fs/promises'
import path from 'path'
import { createServer, build } from 'vite'
import { ChildProcess, spawn } from 'child_process'
let mode = 'dev'

if(process.argv.includes('build')) {
    mode = 'build'
} else if(process.argv.includes('pack')) {
    mode = 'pack'
} else if(process.argv.includes('deploy')) {
    mode = 'deploy'
} else if(process.argv.includes('preview')) {
    mode = 'preview'
} else if(process.argv.includes('init')) {
    mode = 'init'
}
 

if(mode === 'dev') {
    const vite = await createServer({
        plugins: [svelite()]
    })

    await vite.listen()
    vite.printUrls()

} else if(mode === 'build') {
    const isVercel = process.argv.includes('vercel')
    if(isVercel) {
        mkdirSync('./build/.vercel/output/functions/fn.func', {recursive: true})
        writeFileSync('./build/.vercel/output/functions/fn.func/package.json', JSON.stringify({
            type: "module",
        }))

        writeFileSync('./build/.vercel/output/config.json', JSON.stringify({
            version: 3,
            routes: [
                {
                    handle: "filesystem"
                },
                {
                    "src": "/.*",
                    "dest": "/fn"
                }
            ]
        }))

        writeFileSync('./build/.vercel/output/functions/fn.func/.vc-config.json', JSON.stringify({
            runtime: "nodejs20.x",
            handler: "index.js",
            launcherType: "Nodejs"
        }))

        writeFileSync('./build/.vercel/output/functions/fn.func/index.js', `
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
        `)
    }
    const result = await build({
        plugins: [svelite()],
        build: {
            ssr: true,
            outDir: isVercel ? 'build/.vercel/output/functions/fn.func/server' : 'build/server',
            rollupOptions: {
                input: path.resolve('.svelite/server.js'),
            }
        },
        ssr: {
            noExternal: ['esm-env']
        }
    }).then(res => {
        // res.write()
    })
    console.log('here: ')
    const result2 = await build({
        build: {
            outDir: isVercel ? 'build/.vercel/output/static' : 'build/client',
            rollupOptions: {
                input: '.svelite/index.html'
            }
        },
        plugins: [svelite()]
    }).then(res => {
    })
    
    if(isVercel)
    {
        renameSync('./build/.vercel/output/static/.svelite/index.html', './build/.vercel/output/functions/fn.func/index.html');
    }

    const indexJS = `import {render} from './server/server.js'
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

app.listen(3000, () => console.log('server started at localhost:' + 3000))`

    writeFileSync('build/index.js', indexJS)
    
} else if(mode === 'deploy') {
    if(process.argv.includes('vercel')) {
        spawn('vercel', ['deploy', '--prebuilt', '--prod', 'build'])
    }

} else if(mode === 'preview') {
    preview()
    // cd dist && node index.js
} else if(mode === 'init') {
    init()
    // create file and folder
} else {
    // pack
    const plugins = await readdir('./plugins')

    for(let plugin of plugins) {
        const hasServer = existsSync('./plugins/' + plugin + '/server.js') || existsSync('./plugins/' + plugin + '/server.ts')

        build({
            plugins: [svelte()],
            build: {
                rollupOptions: {
                    output: {
                        manualChunks: {}
                    },
                    external: ['svelte']
                },
                outDir: './dist/' + plugin,
                emptyOutDir: false,
                lib: {
                    entry: hasServer ? ['./plugins/' + plugin, './plugins/' + plugin + '/server'] : ['./plugins/' + plugin], 
                    formats: ['es']
                }
            }
        })
    } 
}

async function init() {
    if(existsSync('.svelite/client.js')) return;

    if(!existsSync('svelite.config.js')) {
        writeFileSync('svelite.config.js', `export default {
    plugins: [/* List of plugins */],
    pages: [/* List of pages */],
    modules: {
        // module definitions
    },
    layouts: {
        // layout definitions
    }
}`)
    }

    // create svelite folder
    const indexHTML = `<!DOCTYPE html>
<html>
    <head>
        <!--head-->
    </head>
    <body>
        <div id="app">
            <!--body-->
        </div>
        <script type="module" src="/.svelite/client.js"></script>
    </body>
</html>`

    const clientJS = `import config from '../svelite.config.js'
import init from 'svelitecms/client'

init(config)
`

    const serverJS = `import config from '../svelite.config.js'
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
}`


    mkdirSync('.svelite')

    writeFileSync('.svelite/index.html', indexHTML)
    writeFileSync('.svelite/client.js', clientJS)
    writeFileSync('.svelite/server.js', serverJS)

    console.log('svelite initialized!')
}
