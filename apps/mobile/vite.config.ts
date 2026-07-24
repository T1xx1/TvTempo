import { defineConfig } from 'vite-plus';

export default defineConfig({
	root: './src',
	build: {
		outDir: '../dist',
		minify: false,
		emptyOutDir: true,
	},
});
