import astroI18next from "astro-i18next";
import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";
import vercel from '@astrojs/vercel/edge';

// https://astro.build/config
export default defineConfig({
  integrations: [astroI18next(), preact()],
  adapter: vercel({
    analytics: true,
  }),
  output: "hybrid"
});