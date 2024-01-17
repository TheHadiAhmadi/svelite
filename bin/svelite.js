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
    // cd dist && node index.js
} else if(mode === 'init') {
    // create file and folder
} else {
    // pack
}
