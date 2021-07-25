/*
 * @Author: SummerJay__
 * @Date: 2021-07-24 11:04:02
 * @LastEditTime: 2021-07-24 19:48:16
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\store\shopcart.js
 */

import { reqAddOrUpdateShopCart } from "@/api";

//shopcart的vuex模块
const state = {};

const actions = {
  //与组件当中用户对接
  //一般都是异步发请求
  //提交mutations

  /**
   * async 函数称作异步函数，一般内部都是由异步操作的
   * async 函数返回值，一定是promise，不看return
   * 返回的promise对象的成功和失败及结，要看return
   * return的结果如果是非promise对象，那么promise一定是成功的，成功的结果就是return的结果
   * return的结果如果是promise对象，那么要看这个return后面的promise对象是成功的还是失败的
   *        如果return的promise对象是成功的，那么promise对象就是成功的，成功的结果就是return的promise成功原因
   *        如果return的promise对象是失败的，那么promise对象就是失败的，失败的结果就是return的promise失败原因
   * 如果没有return结果，而是抛出错误，promise也是失败的，原因就是抛出的错误原因
   */
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code === 500) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
};

const mutations = {};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
