/* jshint esversion:6 */
import axios from 'axios';
import router from '../route';
import store  from '../store';
import { Loading,Message } from 'element-ui';

let loading;
function startLoading(){
  loading = Loading.service({
    lock: true,
    text: '随便加载中...',
    background: 'rgba(0,0,0,.7)'
  });
}

function endLoading(){
  loading.close();
}

axios.defaults.timeout = 6000; // 请求超时

// 请求拦截 设置统一的 header
axios.interceptors.request.use(config => {
  startLoading();
  if(localStorage.eleToken) config.headers.Authorization = localStorage.eleToken;
  return config;
},error => Promise.reject(error));

// 响应拦截
axios.interceptors.response.use(config => {
  endLoading();
  return config;
},error => {
  endLoading();
  Message.error(error.response.data);
  let { status } = error.response;
  if(status == 401){
    Message.error("token失效，请重新登录！");
    localStorage.removeItem('eleToken');
    store.dispatch('clearCurrentState');
    router.push('/login');
  }
  return Promise.reject(error);
});

export default axios;