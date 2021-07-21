/*
 * @Author: SummerJay__
 * @Date: 2021-07-18 10:38:10
 * @LastEditTime: 2021-07-21 09:33:22
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
