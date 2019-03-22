/* jshint esversion:6 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App';
import router from './route';
import store from './store';
import axios from './utils/http';

import '../static/css/reset.css';

import '../static/font-awesome/css/font-awesome.min.css';

import VueClipboard from 'vue-clipboard2';

Vue.use(VueClipboard)

Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
