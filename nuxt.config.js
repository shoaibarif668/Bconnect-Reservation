export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',
  generate:{
    fallback:true
  },
  // publicRuntimeConfig: {
  //   baseURL: process.env.API_URL || 'http://localhost:8080',
  // },

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
    '@/assets/css/main.css',
    // 'vue-step-wizard/dist/vue-step-wizard.css'
    'vue-form-wizard/dist/vue-form-wizard.min.css',
    'vue-cal/dist/vuecal.css',
    'vue2-datepicker/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vue-tabulator.js", mode: "client", ssr: "false" },
    "@/plugins/reservation-api.js",
    "@/plugins/vue-step-wizard.js",
    '@/plugins/vue-datepicker.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/postcss8',
    '@nuxtjs/fontawesome'
    // '~vue-tabulator/dist/scss/bootstrap/tabulator_bootstrap4',
  ],

  fontawesome:{
    icons:{
      solid : true,
      brands : true
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-vue-multiselect'
  ],
  router: {
    middleware: ["auth"]
  },

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.API_URL || 'http://localhost:8080',
        endpoints: {
          login: {
            url: '/login'
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
    // proxy: true,
    baseURL: process.env.API_URL,
    credentials: true,
  },

  // proxy: {
  //   '/': { target: process.env.API_URL, pathRewrite: { '^/': '' }, changeOrigin: true},
  //   Implement 2nd API URL here
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    }
  }

}
