
import { parse } from 'acorn'
import { generate } from 'escodegen'
import { walk } from "estree-walker";

export function removeServerCode(file) {
    const ast = parse(file, { sourceType: 'module' })

    walk(ast, {
        enter(node, parent, key, index) {

            if (node.type === 'Property') {
                if (node.key.type === 'Identifier' && node.key.name.startsWith('$')) {
                    this.remove()
                }
            }
        }
    })

    return generate(ast)
}
