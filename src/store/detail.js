/*
 * @Author: SummerJay__
 * @Date: 2021-07-23 19:41:27
 * @LastEditTime: 2021-07-23 22:16:52
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\store\detail.js
 */

import { reqDetailInfo } from "@/api";

//detail的vuex模块
const state = {
  detailInfo: {},
};

/**
 * state是vuex存储数据的地方，但是这个state并不是永久存储
 * 当我们刷新页面或者重新启动项目(可以认为刷新页面就是重启了一下项目)
 * 那么vuex当中所有的数据，都要重新初始化，重新发请求去获取
 * state里面的数据一开始就是有的，只不过是我们初始化的，不是请求回来的
 * 但是state这个初始化的数据，也会影响组件(组件也是可以获取这个初始化数据)
 */

const actions = {
  async getDetailInfo({ commit }, skuId) {
    let result = await reqDetailInfo(skuId);
    if (result.code === 200) commit("RECEIVE_DETAILINFO", result.data);
  },
};

const mutations = {
  RECEIVE_DETAILINFO(state, value) {
    return (state.detailInfo = value);
  },
};

const getters = {
  categoryView(state) {
    return state.detailInfo.categoryView || {};
  },
  skuInfo(state) {
    /**
     * 当请求的数据回来skuInfo才会是真正的对象
     * 当请求的数据没回来skuInfo就是undefined
     * 这里或一个{},目的就是为了不给组件传递undefined，否则使用skuInfo.xxx就会报错
     * 因此我们这里或一个{},即使数据没获取回来，但是我们给组件的不是undefined。保证不会出错
     */
    return state.detailInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.detailInfo.spuSaleAttrList || [];
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
