/*
 * @Author: SummerJay__
 * @Date: 2021-07-18 14:25:30
 * @LastEditTime: 2021-07-18 15:15:27
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\store\home.js
 */

import { reqCategoryList } from "@/api";

//home的vuex模块
const state = {
  //存数据
  categoryList: [],
};

const actions = {
  async getCategoryList({ commit }) {
    //发送请求拿数据，提交给mutations，存储到state
    //async和await作用
    //可以通过同步代码实现异步效果，可读性强
    //.then.catch不是说不能用，而是可读性不强，里面还是有异步代码(异步回调函数)
    const result = await reqCategoryList();
    if (result.code === 200) commit("RECEIVE_CATEGORYLIST", result.data);
  },
};

const mutations = {
  RECEIVE_CATEGORYLIST(state, value) {
    state.categoryList = value;
  },
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
