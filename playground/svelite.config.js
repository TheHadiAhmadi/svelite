export * from './svelite.js'

function svelite() {
    let mode = 'dev'

    console.log(process.argv[1])
}

const config = {
    views: './src/views',
    pages: './src/pages',
}

svelite(config)