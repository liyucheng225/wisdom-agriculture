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
//   document.title=to.matched[0].meta.title
//   // console.log(to)
//   // console.log(from)
//   // next()   //至此就可以显示页面了
//   //做业务逻辑,如果是登录状态，就进行下一步（注意登录页面不可做这个判断）
//   if (to.name == 'Login') {//如果要去的页面是登录页面，就进行下一步，不做判断
//     next()
//   }else if(to.name == 'Register') {
//     next()
//   } else {
//     if (store.getters.isLogin === true) {
//
//       next()
//     } else {
//       next('/Login')
//     }
//   }
// });

