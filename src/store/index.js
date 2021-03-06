/*
 * @Author: SummerJay__
 * @Date: 2021-07-18 14:01:53
 * @LastEditTime: 2021-07-29 09:15:43
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\store\index.js
 */

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import home from "./home";
import user from "./user";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import trade from "./trade";

const state = {
  //用于存数据
};

const actions = {
  //与组件当中的用户对接，一般在此处异步发送请求,提交给mutations
};

const mutations = {
  //直接修改数据
};

const getters = {
  //用于简化数据的操作
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    //modules代表模块化
    user,
    home,
    search,
    detail,
    shopcart,
    trade,
  },
});
