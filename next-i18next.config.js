/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    localeDetection: false,
  },
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  ns: [
    'common',
    'main',
    'sections/header',
    'sections/hero',
    'sections/testimonials',
    'sections/timeline',
    'projects/web-projects',
    'projects/mobile-projects',
    'projects/design-projects',
    'projects/3d-projects',
  ],
  defaultNS: 'common',
  localePath: './public/locales',
}
