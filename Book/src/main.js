import Vue from 'vue'
import book from '../book/index.js'
import App from './App.vue'
Vue.use(book)
new Vue({
  el: '#app',
  render: h => h(App)
})
