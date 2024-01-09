import {dirname} from 'path';
import {fileURLToPath} from 'url'

const file = fileURLToPath(import.meta.url)
const folder = dirname(file)

console.log('postcss config', folder)

export default {
	plugins: {
		tailwindcss: { 
            config: folder + '/tailwind.config.js' 
        },
	}
};
