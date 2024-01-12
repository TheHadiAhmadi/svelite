#!/usr/bin/env node

import {spawn} from 'child_process'
import {readFileSync, rmSync, writeFileSync} from 'fs'
import { createServer } from 'vite'

const pack = JSON.parse(readFileSync('./package.json', 'utf-8') ?? "{}")
const config = pack.svelite

async function generateConfig({adapter}) {

    writeFileSync('postcss.config.js', `
export default {
    plugins: {
        tailwindcss: true
    }
}
`)
    writeFileSync('svelte.config.js', `
import svelte from 'svelitecms/config/svelte'
export default svelte({adapter: '${adapter}'})
`)
    writeFileSync('vite.config.js', `
import vite from 'svelitecms/config/vite'
export default vite()
`)
    writeFileSync('tailwind.config.js', `
export default {
    content: ["./modules/**/*.svelte", "./plugins/**/*.svelte"],
    darkMode: "class",
}
`)
}

function removeConfigFiles() {
    console.log('remove config files')
    rmSync('./tailwind.config.js')
    rmSync('./postcss.config.js')
    rmSync('./svelte.config.js')
    rmSync('./vite.config.js')
}

async function startDevelopmentServer() {
    const server = await createServer({})

    await server.listen()
    server.printUrls()
    
}

async function buildProject() {
    const buildProcess = spawn('npx', ['vite', 'build']);

    console.log('Building...')
    // Handle process exit
    buildProcess.on('close', (code) => {
        console.log(`Vite build process exited with code ${code}`);

        removeConfigFiles()
    });

}

generateConfig(config)

if(process.argv.includes('build')) {
    buildProject()
} else {
    startDevelopmentServer()
}
