import VueRouter from 'vue-router'

import Login from '../pages/login.vue'
import Main from '../pages/main.vue'
import Register from '../pages/register.vue'


export default new VueRouter({
  mode: 'history',
    routes: [
        { path: '/', 
        name: 'login',
        component: Login },
        { path: '/app',
        name: 'app',
        component: Main },
        { path: '/register',
        name: 'register',
        component: Register }
      ]
})