/*
 * @Author: SummerJay__
 * @Date: 2021-07-29 09:15:21
 * @LastEditTime: 2021-07-29 09:31:49
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\store\trade.js
 */

import { reqTradeInfo } from "@/api";

const state = {
  //用于存数据
  tradeInfo: {},
};

const actions = {
  //与组件当中的用户对接，一般在此处异步发送请求,提交给mutations
  async getTradeInfo({ commit }) {
    let result = await reqTradeInfo();
    if (result.code === 200) {
      commit("RECEIVE_TRADEINFO", result.data);
    }
  },
};

const mutations = {
  //直接修改数据
  RECEIVE_TRADEINFO(state, value) {
    state.tradeInfo = value;
  },
};

const getters = {
  //用于简化数据的操作
  detailArrayList(state) {
    return state.tradeInfo.detailArrayList || [];
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
