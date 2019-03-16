/* jshint esversion:6 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

const state = {  // 数据仓库
  isAuthenticated: false, // 是否认证
  user: {}, // 用户信息
  profile: {}, // 用户个人配置信息
  profiles: []
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});