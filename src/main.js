import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import { firestorePlugin } from 'vuefire'

import {
	MdButton,
	MdCheckbox,
	MdContent,
	MdDivider,
	MdField,
	MdIcon,
	MdList,
	MdTabs,
	MdToolbar,
} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(firestorePlugin)
Vue.use(MdButton)
Vue.use(MdCheckbox)
Vue.use(MdContent)
Vue.use(MdDivider)
Vue.use(MdField)
Vue.use(MdIcon)
Vue.use(MdList)
Vue.use(MdTabs)
Vue.use(MdToolbar)

Vue.config.productionTip = false

Vue.filter('currency', num =>
	typeof num === 'number' ? `${ num < 0 ? '\u2212' : '' }$${ Math.abs(num).toFixed(2) }` : num
)

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
