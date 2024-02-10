import Test2Plugin from './plugins/test2-plugin/server'

export default {
    plugins: [Test2Plugin],
    routes: {
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
