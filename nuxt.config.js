export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'bcfront',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/bConnect.png' }
    ],
    components: {
      dirs: [
        '~/components',
        '~/components/forms'
      ]
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vue-tabulator.js", mode: "client", ssr: "false" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    // '~vue-tabulator/dist/scss/bootstrap/tabulator_bootstrap4',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  router: {
    middleware: ["auth"]
  },

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: 'http://localhost:8080',
        endpoints: {
          login: {
            url: '/login',
            // method:
          },
          user: ''
        },
        options: {
          expires: 1
        }
      }
    }
  },
  axios: {
    baseURL: 'http://localhost:8080',
    credentials: true,
},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
