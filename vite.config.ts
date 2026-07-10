import { defineConfig } from 'vite-plus';

export default defineConfig({
	staged: {
		'*': 'vp check --fix',
	},
	fmt: {
		ignorePatterns: ['packages/ui/src/lib/shadcn'],
		singleQuote: true,
		sortImports: true,
		sortTailwindcss: true,
		useTabs: true,
	},
	lint: {
		ignorePatterns: ['packages/ui/src/lib/shadcn'],
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
