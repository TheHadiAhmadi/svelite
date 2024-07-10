const Fields = {
    id: {
        type: 'string'
    },
    name: {
        type: 'string'
    },
    description: {
        type: 'string'
    },
    username: {
        type: 'string',
        // validations...
    },
    roleId: {
        type: 'uuid'
    },
}

// export const Role = () => ({
//     name: 'Role',
//     type: 'object',
//     fields: {
//         id: Fields.id,
//         name: Fields.name,
//         description: Fields.description
//     },
//     readonly: ['id'],
//     with: {
//         users: {type: 'list', field: () => User}
//     }
// })

function relation(field, model, multiple = false) {
    return {
        type: 'relation',
        multiple,
        field,
        model
    }
}

function field(type, config) {
    return {
        ...config,
        type, 
    }
}

// export const Role = {
//     id() {
//         return field('string')
//     },
//     name() {
//         return field('string')
//     },
//     description() {
//         return field('string')
//     },
//     users() {
//         return relation('users', User, true)
//     }
// }

// export const Role = {
//     id: field({
//         type: 'string'
//     }),
    
//     name: field({
//         type: 'string'
//     }),

//     username: field({
//         type: 'string'
//     }),

//     role: field({
//         type: 'relation',
//         key: 'roleId',
//         model: () => User
//     }),
// }

// export const User = {
//     id: field({
//         type: 'string'
//     }),
    
//     name: field({
//         type: 'string'
//     }),

//     username: field({
//         type: 'string'
//     }),

//     role: field({
//         type: 'relation',
//         key: 'roleId',
//         model: () => Role
//     }),
// }

// export const UserCreateRequest = {
//     name: 'UserCreateRequest',
//     type: 'object',
//     fields: {
//         name: Fields.name,
//         username: Fields.username,
//         roleId: Fields.roleId 
//     }
// }

// export const UserUpdateRequest = {
//     name: 'UserUpdateRequest',
//     type: 'object',
//     fields: {
//         id: Fields.id,
//         name: Fields.name,
//         username: Fields.username,
//         roleId: Fields.roleId
//     }
// }

// export const RoleDetailResponse = {
//     name: 'RoleDetailResponse',
//     type: 'object',
//     fields: {
//         id: Fields.id,
//         name: Fields.name,
//         description: Fields.description,
//         users: {
//             type: 'list',
//             field: User
//         }
//     }
// }

// export const UserDetailResponse = {
//     type: 'object',
//     fields: {
//         id: Fields.id,
//         name: Fields.name,
//         username: Fields.username,
//         role: Role 
//     }
// }

export const Role = () => ({
    name: 'Role',
    fields: {
        id: {
            type: 'string',
            visibility: {
                create: false
            }
        },
        name: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        users: {
            type: 'relation',
            field: 'userIds',
            multiple: true,
            model: User
        }
    }
})

export const User = () => ({
    name: 'User',
    fields: {
        id: {
            type: 'string',
            visibility: {
                create: false
            }
        },
        name: {
            type: 'string',
        },
        role: {
            type: 'relation',
            field: 'roleId',
            model: Role
        }
    }
})

export const Category = () => ({
    name: 'Category',
    fields: {
        id: {
            type: 'string',
            visibility: {
                create: false
            }
        },
        name: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        products: {
            type: 'relation',
            field: 'categoryId',
            multiple: true,
            model: Product
        }
    }
});

export const Product = () => ({
    name: 'Product',
    fields: {
        id: {
            type: 'string',
            visibility: {
                create: false
            }
        },
        name: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        price: {
            type: 'number',
        },
        category: {
            type: 'relation',
            field: 'categoryId',
            model: Category
        },
        orders: {
            type: 'relation',
            field: 'productId',
            multiple: true,
            model: Order
        }
    }
});

export const Order = () => ({
    name: 'Order',
    fields: {
        id: {
            type: 'string',
            visibility: {
                create: false
            }
        },
        orderNumber: {
            type: 'string',
        },
        totalAmount: {
            type: 'number',
        },
        products: {
            type: 'relation',
            field: 'orderId',
            multiple: true,
            model: Product
        }
    }
});