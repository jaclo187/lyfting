import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from './plugins/vuetify'
import vuetify from './plugins/vuetify'
import {sync} from 'vuex-router-sync'

Vue.config.productionTip = false

Vue.use(Vuetify)

sync(store, router)

new Vue({
  router,
  store,
  Vuetify,
  vuetify,
  render: h => h(App)
}).$mount('#app')
