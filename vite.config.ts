import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vitest/config';
import {svelteTesting} from '@testing-library/svelte/vite';
import { kitRoutes } from 'vite-plugin-kit-routes';

export default defineConfig({
	plugins: [enhancedImages(), sveltekit(), svelteTesting(), kitRoutes()],
	test: {
		globals: true,
		environment: 'jsdom',
    	setupFiles: ['./vitest-setup.js'],
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	define: {
		SUPERFORMS_LEGACY: true
	},
	server: {
		port: 3000
	}
});
