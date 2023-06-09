import i18n from "astro-i18n"
import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [i18n(),preact()]
});