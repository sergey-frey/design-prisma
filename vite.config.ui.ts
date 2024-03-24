import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "node:path";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte(), viteSingleFile()],
	build: {
		emptyOutDir: false,
		watch: {
			include: "src/**",
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			$lib: path.resolve("./src/shared/lib"),
		},
	},
});
