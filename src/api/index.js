/*
 * @Author: SummerJay__
 * @Date: 2021-07-18 10:38:10
 * @LastEditTime: 2021-07-31 11:02:52
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\api\index.js
 */

//此文件写的都是接口请求函数
//以后，我们的每个接口都对应了一个函数,如果想要拿相关接口的数据,只需要调用相关的接口请求函数

//请求三级分类列表数据的接口函数
/**
 * axios使用 函数用法  对象用法
 * 三种参数  params  query  请求体参数
 * params参数   在url当中携带,属于路径一部分
 * query参数    可以再url当中携带 ? 分割，后面就是query参数；也可以在配置对象当中配置，配置的属性名叫params
 * 请求体参数    在配置对象当中data里面配置，请求方式是put和post才有请求体参数
 * */

import request from "./ajax";
import mockAjax from "@/api/mockAjax";

export const reqCategoryList = () => {
  return request({
    url: "/get/product/getBaseCategoryList",
    method: "get",
  });
};

//验证请求是否成功
// reqCategoryList(); //这里如果想要调用此方法，需要把模块引入到main当中

export const reqBannerList = () => {
  return mockAjax({
    url: "/banner",
    method: "get",
  });
};

export const reqFloorList = () => {
  return mockAjax({
    url: "/floor",
    method: "get",
  });
};

//请求获取search页面的数据
//这个请求参数searchObj必须是一个对象可以是空对象，但是必须传,不能不传
//其实用户发请求的时候，这个参数是可以给空对象{},也是可以获取到数据的，代表获取商品默认搜索的数据
export const reqSearchInfo = (searchObj) => {
  return request({
    url: "/post/list",
    method: "post",
    data: searchObj, //searchObj是用户搜索的参数，这个参数是用户在发请求的时候给传递的
  });
};
// reqSearchInfo({});

//请求获取详情数据
export const reqDetailInfo = (skuId) => {
  return request({
    url: `/get/item/${skuId}`,
    method: "get",
  });
};

//请求添加购物车(修改购物车的商品数量)
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return request({
    url: `/post/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
    data: { skuId: skuId, skuNum: skuNum },
  });
};

//请求获取购物车页面数据
export const reqShopCartList = () => {
  return request({
    url: `/get/cart/cartList`,
    method: "get",
  });
};

//请求修改购物车选中状态
export const reqUpdateCartIscheck = (skuId, isChecked) => {
  return request({
    url: `/get/cart/checkCart/${skuId}/${isChecked}`,
    method: "get",
  });
};

//请求删除购物车数据
export const reqDeleteShopCart = (skuId) => {
  return request({
    url: `/delete/cart/deleteCart/${skuId}`,
    method: "delete",
    data: {
      skuId,
    },
  });
};

//请求注册用户---参数 code phone password
export const reqUserRegister = (userInfo) => {
  return request({
    url: "/post/user/passport/register",
    method: "post",
    data: userInfo,
  });
};

//请求获取用户注册验证码
export const reqGetCode = (phone) => {
  return request({
    url: `/get/user/passport/sendCode/${phone}`,
    method: "get",
  });
};

//请求用户登陆

//返回的数据   ---- 返回的东西不严谨，登陆成功后只返回token标识,不会有其他的
//而其他的用户数据需要重新根据token发请求获取(token校验)
// data:{
//   nickName:"Administrator",
//   name:"Admin",
//   token: 90aa16f24d04c7d882051412f9ec45b"
//   }
export const reqUserLogin = (userInfo) => {
  return request({
    url: "/post/user/passport/login",
    method: "post",
    data: userInfo,
  });
};

//根据token请求获取用户的信息
export const reqGetUserInfo = () => {
  return request({
    url: "/get/user/passport/auth/getUserInfo",
    methods: "get",
  });
};

//请求退出登录
export const reqUserLogout = () => {
  return request({
    url: "/get/user/passport/logout",
    method: "get",
  });
};

//请求获取用户的收获地址信息
export const reqUserAddressList = () => {
  return request({
    url: "/get/user/userAddress/auth/findUserAddressList",
    method: "get",
  });
};

//请求获取订单交易页面信息
export const reqTradeInfo = () => {
  return request({
    url: "/get/order/auth/trade",
    method: "get",
  });
};

//请求提交订单创建订单
export const reqSubmitOrder = (tradeNo, tradeInfo) => {
  return request({
    url: `/post/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data: tradeInfo,
  });
};

//请求获取支付信息
export const reqPayInfo = (orderId) => {
  return request({
    url: `/get/payment/weixin/createNative/${orderId}`,
    method: "get",
  });
};

//请求获取订单支付状态
export const reqPayStatus = (orderId) => {
  return request({
    url: `/get/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  });
};

//请求获取我的订单列表数据
export const reqMyOrderInfo = (page, limit) => {
  return request({
    url: `/get/order/auth/${page}/${limit}`,
    method: "get",
  });
};
