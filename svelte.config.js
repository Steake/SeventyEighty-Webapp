import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			edge: false,
			split: false
		}),
		alias: {
			$lib: 'src/lib'
		}
	},
	preprocess: vitePreprocess(),
	vitePlugin: {
		inspector: true
	}
};

export default config;