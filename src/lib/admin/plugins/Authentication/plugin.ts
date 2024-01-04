import modules from "./modules";
import layouts from "./layouts";

export default (config) => {
    const authPrefix = config.authPrefix ?? 'auth'

    const authLayout = {
        name: 'AuthLayout',
        props: {}
    }

    const loginPage = {
        slug: authPrefix + '/login',
        title: 'Login',
        layout: authLayout,
        modules: [{ name: 'Login', props: {} }]
    };

    const registerPage = {
        slug: authPrefix + '/register',
        title: 'Register',
        layout: authLayout,
        modules: [{ name: 'Register', props: {} }]
    };


    config.layout.props.sidebar.push({ icon: 'logout', title: 'Logout', href: '/auth/logout' });


    // forgot password
    //
    return {
        pages: [registerPage, loginPage],
        modules,
        layouts
    }

}
