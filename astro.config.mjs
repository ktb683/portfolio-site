// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://ktb683.github.io',
  base: '/portfolio-site',
  vite: {
    plugins: [tailwindcss()]
  }
});