#!/usr/bin/env node

import {existsSync, mkdirSync, writeFileSync, writeSync} from 'fs'
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
    // start vite dev server..
} else if(mode === 'build') {
    // run vite build (ssr & client)
} else if(mode === 'preview') {
    preview()
    // cd dist && node index.js
} else if(mode === 'init') {
    init()
    // create file and folder
} else {
    // pack
}

async function init() {
    if(existsSync('.svelite/client.js')) return;

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
    return respond(config, ctx)
}`


    mkdirSync('.svelite')

    writeFileSync('.svelite/index.html', indexHTML)
    writeFileSync('.svelite/client.js', clientJS)
    writeFileSync('.svelite/server.js', serverJS)

    console.log('svelite initialized!')
}

async function build() {

}

async function pack() {

}

async function dev() {
    
}

async function preview() {

}
