// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'stems.me — Stems Platform for Music Production',
      meta: [
        {
          name: 'description',
          content:
            'Upload, mix, and sell your music stems. A platform where artists host stems and fans mix them in the browser.',
        },
      ],
    },
  },

  nitro: {
    preset: 'vercel',
  },
})
