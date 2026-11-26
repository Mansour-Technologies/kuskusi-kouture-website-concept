import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mansour-technologies.github.io',
  base: '/kuskusi-kouture-website-concept',
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory', inlineStylesheets: 'always' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  devToolbar: { enabled: false },
});
