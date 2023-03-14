import content from './content/seo';
import favicon from './config/favicon';

export default defineNuxtConfig({
  css: ['~/assets/sass/style.scss'],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL,
      serverUrl: process.env.SERVER_URL,
      bearerToken: process.env.BEARER_TOKEN,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/sass/app.scss";',
        },
      },
    },
  },
  app: {
    head: {
      title: content.title,
      link: [...favicon.links],
      meta: [{ name: 'description', content: content.description }],
    },
  },
  modules: ['@pinia/nuxt', 'nuxt-icons'],
});
