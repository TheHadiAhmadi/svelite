export default {
    routes: {
        "/rrrrrr": {

            POST() {
                return {body: "rrrrrrrrrr"}
            }
        },
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
