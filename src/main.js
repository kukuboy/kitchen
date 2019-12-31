// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Home from './pages/home'
import router from './router'
import ax from '@/api/api'

Vue.config.productionTip = false
Vue.use(ax)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Home },
  template: '<Home/>'
})
