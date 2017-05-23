// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'loaders.css'
import Toast from './lib/toast.js'
Vue.use(Toast)
// import 'jquery'
/* eslint-disable no-new */

Vue.use(VueResource)
Vue.use(MuseUI)
// global.host = 'http://192.168.25.116/strunApi'
global.host = '../strunApi'
// global.host = 'http://192.168.1.100/strunApi'
global.authdata = ''

// Vue.http.interceptors.push((request, next) => {
//   // request.headers.set('Authorization', global.authdata)
//   // request.headers.set('Content-Type', 'application/json;charset=UTF-8')
//   next(response => {
//     console.log(response.status)
//     return response
//   })
// })

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
