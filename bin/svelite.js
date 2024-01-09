#!/usr/bin/env node

import path from 'path'
import {dirname} from 'path';
import {fileURLToPath} from 'url'
import { createServer } from "vite";

const file = fileURLToPath(import.meta.url)
const folder = dirname(file)

const server = await createServer({
    css: {
        postcss: path.resolve('node_modules/svelitecms/dist/postcss.config.js')
    },
})

await server.listen(5173)

server.printUrls()
