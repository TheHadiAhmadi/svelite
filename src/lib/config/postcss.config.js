import path from 'path'

export default {
	plugins: {
		tailwindcss: { 
            config: path.resolve('svelitecms/config/tailwind.config.js')
        },
	}
};
