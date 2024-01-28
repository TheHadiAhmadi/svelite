#!/usr/bin/env node
import { svelte } from '@sveltejs/vite-plugin-svelte'
import {svelite} from '../src/lib/vite.js'

import {cpSync, existsSync, mkdirSync, writeFileSync, writeSync} from 'fs'
import path from 'path'
import { createServer, build } from 'vite'
let mode = 'dev'

if(process.argv.includes('build')) {
    mode = 'build'
} else if(process.argv.includes('pack')) {
    mode = 'pack'
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
    const result = await build({
        plugins: [svelite()],
        build: {
            ssr: true,
            outDir: 'build/server',
            rollupOptions: {
                input: path.resolve('.svelite/server.js')
            }
        },
    }).then(res => {
        // res.write()
    })
    console.log('here: ')
    const result2 = await build({
        build: {
            outDir: 'build/client',
            rollupOptions: {
                input: '.svelite/index.html'
            }
        },
        plugins: [svelite()]
    }).then(res => {
    })
    

    const indexJS = `import {render} from './server/server.js'
import {readFileSync} from 'fs'
import express from 'express'
import sirv from 'sirv'

const app = express()

app.use(sirv('./client'))

app.use('/', async (req, res) => {
    const template = await readFileSync('./client/.svelite/index.html', 'utf-8')
    const result = await render({url: req.url, template})
    
    res.end(result?.body ?? '')
})

app.listen(3000, () => console.log('server started at localhost:' + 3000))`

    writeFileSync('build/index.js', indexJS)
    // 
} else if(mode === 'preview') {
    preview()
    // cd dist && node index.js
} else if(mode === 'init') {
    init()
    // create file and folder
} else {
    // pack
    const result = await build({
        build: {
            ssr: true,
            outDir: 'dist',
            rollupOptions: {
                input: {
                    svelite: path.resolve("./src/lib/svelite"),
                    client: path.resolve("./src/lib/client"),
                    server: path.resolve("./src/lib/server"),
                    vite: path.resolve("./src/lib/vite"),
                },
            }
        },
        plugins: [svelte()]
    }).then(res => {
    })

    cpSync('./src/lib/components', './dist/components', {
        recursive: true
    })

}

async function init() {
    if(existsSync('.svelite/client.js')) return;

    if(!existsSync('svelite.config.js')) {
        writeFileSync('svelite.config.js', `export defualt {
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
import {SvPage} from 'svelitecms/components'

init(config, SvPage)
`

    const serverJS = `import config from '../svelite.config.js'
import { respond } from 'svelitecms/server'
import {SvPage} from 'svelitecms/components'

export async function render(ctx) {
    ctx.SvPage = SvPage
    return respond(config, ctx)
}`


    mkdirSync('.svelite')

    writeFileSync('.svelite/index.html', indexHTML)
    writeFileSync('.svelite/client.js', clientJS)
    writeFileSync('.svelite/server.js', serverJS)

    console.log('svelite initialized!')
}
