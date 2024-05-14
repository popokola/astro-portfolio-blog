import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://charlesparames.com',
  integrations: [mdx(), sitemap(), tailwind(), react()],
  i18n: {
    defaultLocale: "en",
    locales: ["fr", "en", 'ja', 'ta'],
    routing: {
      prefixDefaultLocale: false
    },
  }
});
