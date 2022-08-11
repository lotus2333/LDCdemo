import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入Element UI组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//使用Element UI
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
