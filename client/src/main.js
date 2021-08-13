import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
import 'material-icons/iconfont/material-icons.css';

import { store } from './store'

Vue.config.productionTip = false

Vue.use(VueRouter)


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
