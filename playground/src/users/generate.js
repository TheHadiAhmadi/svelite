import * as models from './model.js'

function indent(value) {
    return Array.from({length: value}, () => `    `).join('');
}

function generateField(key, field, level = 1, nested = false) {
    if(field.type === 'relation') {
        if(nested) {
            const model = field.model()                
            let result = model.name + 'DetailResponse'
                
            if(field.multiple) {
                return `${indent(level)}${key}?: Array<${result}>;\n`
            } else {
                return `${indent(level)}${key}?: ${result};\n`
            }
        } else {
            return `${indent(level)}${field.field}: ${field.multiple ? 'Array<string>' : 'string'};\n`
        }

    } else {
        if(field.type === 'uuid') field.type = 'string'
        return `${indent(level)}${key}: ${field.type};\n`
    }
}

function generate(modelFn) {
    const model = modelFn()

    let result = `export type ${model.name}CreateRequest = {\n`

    for(let key in model.fields) {
        const field = model.fields[key]
        const visible = field.visibility ? field.visibility.create : true;
        if(visible) {
            result += generateField(key, field)
        }
    }
    result += `}\n\n`

    result += `export type ${model.name}UpdateRequest = {\n`

    for(let key in model.fields) {
        const field = model.fields[key]
        const visible = field.visibility ? field.visibility.update : true;
        if(visible) {
            result += generateField(key, field)
        }
    }
    result += `}\n\n`

    result += `export type ${model.name}DetailResponse = {\n`

    for(let key in model.fields) {
        const field = model.fields[key]
        const visible = field.visibility ? field.visibility.detail : true;
        if(visible) {
            result += generateField(key, field, 1, true)
        }
    }
    result += `}\n\n`

    return result
}

for(let model in models) {
    console.log(generate(models[model]))
}