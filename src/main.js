import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import { firestorePlugin } from 'vuefire'

import { MdButton, MdContent, MdTabs, MdToolbar } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(firestorePlugin)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdToolbar)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
