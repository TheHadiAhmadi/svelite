import * as test from 'svelitecms/db'

const db = await test.createMongoDb('mongodb://127.0.0.1:27017', 'Hesab')


await db('test').insert({hadi: 'true'})
const res = await db('test').query({page: 1, perPage: 3})
console.log({res})
