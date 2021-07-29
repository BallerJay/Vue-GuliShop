/*
 * @Author: SummerJay__
 * @Date: 2021-07-24 11:04:02
 * @LastEditTime: 2021-07-26 11:40:19
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\store\shopcart.js
 */

import {
  reqAddOrUpdateShopCart,
  reqDeleteShopCart,
  reqShopCartList,
  reqUpdateCartIscheck,
} from "@/api";

//shopcart的vuex模块
const state = {
  shopCartList: [],
};

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
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  async grtShopCartList({ commit }) {
    let result = await reqShopCartList();
    if (result.code === 200) commit("RECEIVE_SHOPCARTLIST", result.data);
  },

  //修改购物车中商品的选中状态
  async updateCartIscheck({ commit }, { skuId, isChecked }) {
    const result = await reqUpdateCartIscheck(skuId, isChecked);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  //使用Promise.all,采用单个修改的接口去修改多个，但是真正不是这样做的
  //真正就应该有一个修改多个的接口
  /**
   * Promise.all() 是Promise的一个api
   * 功能: 批量处理Promise对象
   * 参数: promise对象的数组
   * 返回值: 返回一个新的Promise对象
   * 新的promise对象是成功还是失败
   * 只有所有的promise都成功才成功，只要有一个失败了就直接失败
   * 新的promise对象成功的结果，是参数promise对象数组当中每个promise对象成功的结果组成的数组
   * 新的promise对象失败的结果，是参数promise对象数组当中第一个失败的promise对象失败的原因
   *
   *
   * 没有添加async  updateCartIscheckAll返回的是Promise.all(promises)返回的新的promise
   * 添加了async updateCartIscheckAll返回的是异步函数返回的promise
   * 虽然添加不添加async 返回不是同一个promise，但是最终的结果是一样
   * 原因: async函数返回的promise，最终成功和失败看的是return的Promise.all(promises)返回的promise
   */

  updateCartIscheckAll({ getters, dispatch }, isChecked) {
    let promises = [];
    //getters.cartInfo.cartInfoList获取的就是我们的购物车列表数据
    getters.cartInfo.cartInfoList.forEach((item) => {
      //如果发现其中的每个购物车数据已经和要改变的状态一样，那就不用请求改变了
      if (item.isChecked === isChecked) return;
      let promise = dispatch("updateCartIscheck", {
        skuId: item.skuId,
        isChecked,
      });
      promises.push(promise);
    });
    return Promise.all(promises);
  },

  //删除单个
  async deleteShopCart({ commit }, skuId) {
    let result = await reqDeleteShopCart(skuId);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  //删除多个购物车数据
  deleteShopCartAll({ commit, getters, dispatch }) {
    let promises = [];
    //getters.cartInfo.cartInfoList获取的就是我们的购物车列表数据
    getters.cartInfo.cartInfoList.forEach((item) => {
      //如果发现其中的每个购物车数据已经和要改变的状态一样，那就不用请求改变了
      if (!item.isChecked) return;
      let promise = dispatch("deleteShopCart", item.skuId);
      promises.push(promise);
    });
    return Promise.all(promises);
  },
};

const mutations = {
  RECEIVE_SHOPCARTLIST(state, value) {
    state.shopCartList = value;
  },
};

const getters = {
  cartInfo(state) {
    return state.shopCartList[0] || {};
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
