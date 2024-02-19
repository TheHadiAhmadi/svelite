import test2Plugin from './plugins/test2-plugin/server'
export default {
	db: {
		initial_data: {
			todos: [{name: "abc", "value": "123"}]
		}
	},
    routes: {
        ...test2Plugin.routes,
	'todos': {
	    GET(req) {
	        return req.db('todos').query({}).then(x => x.data)
	    }
	},
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
