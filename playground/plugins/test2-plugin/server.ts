export default {
    routes: {
        '/api/test': {

            GET() {
                return {
                    body: JSON.stringify({
                        abc: 123

                    })
                }

            }
        }

    }

}
