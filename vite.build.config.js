import path from "path";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default {
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: {
        svelite: path.resolve("./src/lib/svelite"),
        client: path.resolve("./src/lib/client"),
        server: path.resolve("./src/lib/server"),
        vite: path.resolve("./src/lib/vite"),
        components: path.resolve("./src/lib/components/index"),
      },
    },
  },
};
