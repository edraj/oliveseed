import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({

  plugins: [sveltekit()],
  server: {
    port: 5500,
    hmr: false,
    watch: { usePolling: false }
  }
});
