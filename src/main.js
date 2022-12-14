import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import toast from './components/common/toast'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store,
  toast
}).$mount('#app')
