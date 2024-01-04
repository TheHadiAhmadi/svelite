import { createSvelite } from './svelite';
import { AdminPanelPlugin } from './admin/plugin';
export default createSvelite({
	plugins: [AdminPanelPlugin({})],
	api: 'http://localhost:5173/api'
});
