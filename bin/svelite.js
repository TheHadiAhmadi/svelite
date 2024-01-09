#!/usr/bin/env node

import path from 'path'
import {dirname} from 'path';
import {fileURLToPath} from 'url'
import { sveltekit } from '@sveltejs/kit/vite';
import { createServer } from "vite";

const server = await createServer({
    plugins: [sveltekit()],
    css: {
        postcss: path.resolve('node_modules/svelitecms/dist/postcss.config.js')
    },
})

await server.listen(5173)

server.printUrls()
