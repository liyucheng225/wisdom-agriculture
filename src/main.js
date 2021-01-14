import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios";
axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// router.beforeEach( function(to,from,next) {
//   if (to.name == 'Login') {
//     document.title=to.matched[0].meta.title
//     next()
//   }else if(to.name == 'Register') {
//     document.title=to.matched[0].meta.title
//     next()
//   } else {
//     if (store.getters.isLogin === true) {
//       document.title=to.matched[0].meta.title
//       next()
//     } else {
//       next('/Login')
//     }
//   }
// });

