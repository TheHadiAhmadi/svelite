class Todo {
    id = '';
    name = '';
    completed = false;

    save() {

    }
}

export default class TodoController {
    #data = {}
    async data(key) {
        return this.#data[key]
    }

    async init(config) {
        this.#data.todos = []
    }

    async insert(req) {
        const data = new Todo({name: 'hadi', completed: true})
        
        data.save()
    }

    async render(req) {
        
        return `
            <h1>TODOS: </h1>
            <ol>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ol>
        `;
    }
}

