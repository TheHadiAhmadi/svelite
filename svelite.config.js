//import Test from './Test.svelte'

export default {
    pages: [
        {slug: '/test', modules: [{name: 'Test', props: {a: 123}}]}
    ],
    modules: {
        Test: {
            name: 'Test',
 //           description: 'This is test module',
  //          component: Test,
            async load(props) {
                console.log('load inside test module', props)

            }
        }
    }

}
