import { defineConfig } from 'vite-plus';

export default defineConfig({
	staged: {
		'*': 'vp check --fix',
	},
	fmt: {
		singleQuote: true,
		sortImports: true,
		sortTailwindcss: true,
		useTabs: true,
	},
	lint: {
		jsPlugins: [
			{
				name: 'vite-plus',
				specifier: 'vite-plus/oxlint-plugin',
			},
		],
		rules: {
			'vite-plus/prefer-vite-plus-imports': 'error',
			'arrow-body-style': ['warn', 'always'],
		},
		options: {
			typeAware: true,
			typeCheck: true,
		},
	},
});
