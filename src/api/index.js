/*
 * @Author: SummerJay__
 * @Date: 2021-07-18 10:38:10
 * @LastEditTime: 2021-07-18 10:59:01
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

export const reqCategoryList = () => {
  return request({
    url: "/get/product/getBaseCategoryList",
    method: "get",
  });
};

//验证请求是否成功
// reqCategoryList(); //这里如果想要调用此方法，需要把模块引入到main当中
