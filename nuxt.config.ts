import content from './content/seo';
import favicon from './config/favicon';

export default defineNuxtConfig({
  css: ['~/assets/sass/app.scss'],
  app: {
    head: {
      title: content.title,
      link: [...favicon.links],
      meta: [{ name: 'description', content: content.description }],
    },
  },
});
