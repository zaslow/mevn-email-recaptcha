import Vue from 'vue'
import VueMaterial from 'vue-material'
import VueRouter from 'vue-router'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-light.css'

import App from './App.vue'
import routes from './routes'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueMaterial)

new Vue({
  render: h => h(App),
  router: new VueRouter({ routes })
}).$mount('#app')
