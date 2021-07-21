/*
 * @Author: SummerJay__
 * @Date: 2021-07-21 09:38:39
 * @LastEditTime: 2021-07-21 10:28:12
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\store\search.js
 */

import { reqSearchInfo } from "@/api";
//search的vuex模块
const state = {
  searchInfo: {},
};

const actions = {
  async getSearchInfo({ commit }, searchParams) {
    //searchParams这个参数，是用户发请求的时候，也就是dispatch的时候给我们传递的
    const result = await reqSearchInfo(searchParams);
    if (result.code === 200) commit("RECEIVE_SEARCHINFO", result.data);
  },
};

const mutations = {
  RECEIVE_SEARCHINFO(state, value) {
    state.searchInfo = value;
  },
};

const getters = {
  //为什么要用getters，是因为我们获取的数据内部结构比较复杂，使用起来不方便，甚至会出现小问题(假报错)
  //所以我们拿到复杂的数据之后，会把这个数据先做计算，计算出来我们要直接使用的数据，简化数据操作
  attrsList(state) {
    return state.searchInfo.attrsList || []; //给空数组的值是为了后期不出现假报错，所以给[]
  },
  goodsList(state) {
    return state.searchInfo.goodsList || [];
  },
  trademarkList() {
    return state.searchInfo.trademarkList || [];
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
