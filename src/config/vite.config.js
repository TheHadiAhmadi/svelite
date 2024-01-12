import { sveltekit } from "@sveltejs/kit/vite";

export default (config) => ({
        ...config,
        plugins: [...(config?.plugins ??[]), sveltekit()],
        server: {
            ...(config?.server ?? {}),
            fs: {
                ...(config?.server?.fs ?? {}),
                strict: false
            }
        },
    optimizeDeps: {
        ...(config?.optimizeDeps ?? {}),
        exclude: [...(config?.optimizeDeps?.exclude ?? []), 'svelitecms']
    }
})
