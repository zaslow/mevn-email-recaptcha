import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-light.css'

import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueMaterial)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
