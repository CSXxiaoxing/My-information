import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router/';
import store from './vuex/store.js';
// iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

// 兼容ios
document.body.addEventListener('touchmove', ()=>{});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})