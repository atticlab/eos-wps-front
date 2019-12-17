module.exports = {
  publicPath: '/',
  lintOnSave: true,
  runtimeCompiler: true,
  productionSourceMap: false,
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
  css: {
    sourceMap: true,
    // FIXME: This global assignment of scss vars doesn't work with Vuetify.
    // Use imports of scss vars for now...
    // loaderOptions: {
    //   sass: {
    //     prependData: '@import "~@/assets/scss/variables";',
    //   },
    // },
  },
  transpileDependencies: [
    'vuetify',
  ],
};
