
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router/';
import store from './vuex/store.js';
// iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
console.log(iView)
// 全局组件注册
import sin_in from './module/global/signIn.vue';
Vue.component('sin-in', sin_in)


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
