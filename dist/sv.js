import { createSvelite } from './svelite';
import modules from './modules';
import layouts from './layouts';
export default createSvelite({
    modules,
    layouts,
    api: 'http://localhost:5173/api'
});
