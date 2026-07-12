import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite-plus';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			alias: {
				'~/*': './src/*',
			},
			compilerOptions: {
				runes: ({ filename }) => {
					return filename.split(/[/\\]/).includes('node_modules') ? undefined : true;
				},
				experimental: {
					async: true,
				},
			},
			adapter: adapter(),
			experimental: {
				remoteFunctions: true,
			},
		}),
	],
});
