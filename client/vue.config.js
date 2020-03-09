const path = require('path')

module.exports = {
  transpileDependencies: ['vuetify'],
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: {
      '/' : {
        target: 'http://localhost:8080'
      }
    }
  }
}
