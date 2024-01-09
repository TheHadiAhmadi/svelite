#!/usr/bin/env node

import {dirname} from 'path';
import {fileURLToPath} from 'url'
import { createServer } from "vite";

const file = fileURLToPath(import.meta.url)
const folder = dirname(file)

const server = await createServer({
    css: {
        postcss: folder
    },
})

await server.listen(5173)

server.printUrls()
