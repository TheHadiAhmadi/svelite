import path from 'path'

export default {
	plugins: {
		tailwindcss: { 
            config: path.resolve('node_modules/svelitecms/dist/config/tailwind.config.js')
        },
	}
};
