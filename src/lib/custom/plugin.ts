import LoginPage from "./LoginPage.svelte"

export default (config) => {


    return {
        pages: [
            {
                slug: 'auth/login',
                title: "Login",
                modules: [{name: "LoginPage", props: {}}]
            }
        ],
        modules: {
            LoginPage: {
                name: "LoginPage",
                load(props, api, params) {
                    // login as different user types...

                },
                component: LoginPage
            }
        },
        layouts: {}
    }
}
