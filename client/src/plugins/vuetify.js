import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#B8C2C3',
          secondary: '#787F80',
          accent: '#F0FEFF',
          error: '#F51901',
          info: '#FFFFFF',
          success: '#00DE4A',
          warning: '#FAE412'
        },
      },
    },
  })
