/*
 * @Author: SummerJay__
 * @Date: 2021-07-18 14:27:08
 * @LastEditTime: 2021-07-29 09:14:41
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\store\user.js
 */

import { getUserTempId } from "@/utils/userabout";
import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqGetUserInfo,
  reqUserLogout,
  reqUserAddressList,
} from "@/api";
//user的vuex模块
const state = {
  //getUserTempId() 这个函数就是专门用来生成用户的临时标识的
  userTempId: getUserTempId(),
  code: "",
  /**
   * token:'', 初始化为空串不对
   * 以前没有登录过，我们初始化空串是没问题的
   * 以前有登录过，那么我们得先从localStorage里面去获取，如果获取不到
   * 那么我们再去登录，获取到了，就不需要登录了,并且token不是随意更改的
   * 自动登录先从localStorage获取，能拿到就不需要再发登陆请求了
   */
  token: localStorage.getItem("TOKEN_KEY"),
  //第一次登录时，我们先初始化为空串
  // token: "", //初始化为空串无法自动登录
  userInfo: {},
  userAddressList: [],
};

const actions = {
  async userRegister({ commit }, userInfo) {
    let result = await reqUserRegister(userInfo);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  //请求获取code
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone);
    if (result.code === 200) {
      commit("RECEIVE_CODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  //请求登陆
  async userLogin({ commit }, userInfo) {
    let result = await reqUserLogin(userInfo);
    if (result.code === 200) {
      commit("RECEIVE_TOKEN", result.data.token);
      /**
       * token获取到以后，需要存储到localStorage当中，因为token在一定时间内(过期时间)
       * 也不是随意更改的
       */
      //自动登陆需要保存token到localStorage
      localStorage.setItem("TOKEN_KEY", result.data.token);
      return "ok";
      // localStorage.setItem("TOKEN_KEY", result.data.token);
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  //根据token请求获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqGetUserInfo();
    if (result.code === 200) {
      commit("RECEIVE_USERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  //清除用户的token信息
  // async clearToken({ commit }) {
  //   commit("RESET_USER");
  //   localStorage.removeItem("TOKEN_KEY"); //当token过期，需要把过期的token清掉
  // },

  //退出登录
  async userLogout({ commit }) {
    let result = await reqUserLogout();
    if (result.code === 200) {
      //清除数据  清空state的token和用户信息   清空localStorage的token
      localStorage.removeItem("TOKEN_KEY");
      commit("RESET_USER");
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  //获取用户收货地址
  async getUserAddressList({ commit }) {
    let result = await reqUserAddressList();
    if (result.code === 200) {
      commit("RECEIVE_USERADDRESSLIST", result.data);
    }
  },
};

const mutations = {
  RECEIVE_CODE(state, value) {
    state.code = value;
  },
  RECEIVE_TOKEN(state, value) {
    state.token = value;
  },
  RECEIVE_USERINFO(state, value) {
    state.userInfo = value;
  },
  //token过期需要重新清空
  // RESET_TOKEN(state, value) {
  //   state.token = "";
  // },

  //退出登录需要清空用户信息及token,它可以和上面的token过期并用一个
  RESET_USER(state) {
    state.token = "";
    state.userInfo = {};
  },
  RECEIVE_USERADDRESSLIST(state, value) {
    state.userAddressList = value;
  },
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
