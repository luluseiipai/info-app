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

// 重置css样式
import '../static/css/reset.css';

// 字体库
import '../static/font-awesome/css/font-awesome.min.css';


// 富文本编辑器
import VueClipboard from 'vue-clipboard2';
import htmlToPDF from './views/dashboard/utils/htmlToPDF';
Vue.use(htmlToPDF);

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
