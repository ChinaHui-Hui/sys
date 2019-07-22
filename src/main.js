// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App'
import router from './router'



Vue.use(ElementUI);

Vue.config.productionTip = false
// 配置axios
import axios from 'axios'
Vue.prototype.$http = axios

// 引入reset.css animate.css iconfont.css
import './assets/css/reset.css'
import 'animate.css'
import './assets/css/iconfont.css'

// 引入jquery
import 'jquery'

// 引入公共组件
import commonComponent from './components/common'
for(var i in commonComponent){
  Vue.component(i,commonComponent[i])
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
