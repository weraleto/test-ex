import Vue from 'vue'
import App from './App.vue'

import './plugins/axios.js'
import './assets/style/style.sass'

new Vue({
  el: '#app',
  render: h => h(App)
})
