import { defineConfig } from '#q-app/wrappers'


export default defineConfig((ctx) => {
  return {
    
    boot: ['axios'],
    css: ['app.scss'],

    extras: [
   
      'fontawesome-v6',
      'line-awesome',
      

      'roboto-font', 
      'material-icons', 
    ],

    build: {
      env: {
        API_URL: ctx.dev
          ? 'http://localhost:3000'
          : 'http://localhost:3000'
      },
      
      target: {
        browser: 'baseline-widely-available',
        node: 'node22',
      },

      vueRouterMode: 'hash',

      extendViteConf (viteConf) {
      viteConf.server = viteConf.server || {}
      viteConf.server.watch = {
      usePolling: true,
      interval: 1000
     }
    },  

      vitePlugins: [
        [
          'vite-plugin-checker',
          {
            eslint: {
              lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{js,mjs,cjs,vue}"',
              useFlatConfig: true,
            },
          },
          { server: false },
        ],
      ],
    },

    devServer: {
      open: true, 
    },

    framework: {
      config: {},
      plugins: [],
    },


    animations: [],

    ssr: {
      prodPort: 3000,

      middlewares: [
        'render',
      ],
      pwa: false,
    },


    pwa: {
      workboxMode: 'GenerateSW',
    },

    cordova: {
    },

    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      preloadScripts: ['electron-preload'],

      inspectPort: 5858,

      bundler: 'packager',

      packager: {},

      builder: {
        appId: 'instadev',
      },
    },

    bex: {

      /**
       * The list of extra scripts (js/ts) not in your bex manifest that you want to
       * compile and use in your browser extension. Maybe dynamic use them?
       *
       * Each entry in the list should be a relative filename to /src-bex/
       *
       * @example 
       */
      extraScripts: [],
    },
  }
})
