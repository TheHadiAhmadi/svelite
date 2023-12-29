function createApi(url: string) {
    async function run(collection: stirng, action: stirng, body: any) {
        const opts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...body, action})
        }

        const result = await fetch(url + '/' + collection, opts).then(res => res.json())




        return result;
    }
    return (collection: string) => ({
        insert: (data: any) => run(collection, 'insert', {data}),
        update: (data: any) => run(collection, 'update', {data}),
        remove: (id: string) => run(collection, 'remove', {data: id}),
        find: () => {
            let filters : any[] = []
            let page = 0;
            let perPage = 0;

            function filter(field: string, operator: string, value: any) {
                filters.push({field, operator, value})
                return {
                    filter, paginate, all, first
                }
            }

            function paginate(_page: number, _perPage: number) {
                page = _page
                perPage = _perPage

                return run(collection, 'find', {filters, page, perPage})
            }

            function all() {
                return run(collection, 'find', {filters})
            }

            function first() {
                return run(collection, 'find', {filters}).then(res => ({...res, data: res.data[0]}))
            }

            return {
                all,
                paginate,
                filter,
                first
            }
        }
    })
}

export default createApi('http://localhost:5173/api')
