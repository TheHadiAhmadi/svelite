import test2Plugin from './plugins/test2-plugin/server'
export default {
    routes: {
        ...test2Plugin.routes,
        '/': {
            POST(request) {
                return {
                    body: "Home POST",
                }
            },
            GET() {
                return {
                    body: 'HOME GET'
                }
            }
        }
    }
}
