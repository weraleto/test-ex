import Vue from 'vue'
import App from './App.vue'

import './plugins/axios.js'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

import './assets/style/style.sass'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
