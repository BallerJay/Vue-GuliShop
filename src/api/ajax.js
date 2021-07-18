/*
 * @Author: SummerJay__
 * @Date: 2021-07-18 08:56:27
 * @LastEditTime: 2021-07-18 10:08:22
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\api\ajax.js
 */

//此文件是对axios进行二次封装
//目的是axios发请求的时候，具有其它的功能
/**
 * 需求如下:
 *        1.配置基础路径和超时限制
 *        2.添加进度条信息---nprogress
 *        3.返回的响应不再需要从data属性当中拿数据,而是响应就是我们要的数据
 *        4.统一处理请求错误,具体请求也可以选择处理或不处理
 */

import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
//以后只要是对axios二次封装，不会在axios身上直接去封装，而是创建一个新的axios实例进行封装

//axios.create()创建一个新的和axios具有相同功能的一个实例
const service = axios.create({
  // 配置基础路径和超时限制
  baseURL: "/api/v2", //设置当前项目当中所有接口路径的公共路径部分，基础路径
  timeout: 20000, //当ajax请求超过设置的这个时间就会报错
});

//添加进度条信息功能---nprogress
//以后如果你想对axios添加额外的功能或者是给请求头添加额外的信息
//必然用到axios的请求拦截器和响应拦截器

// Add a request interceptor  请求拦截器
service.interceptors.request.use(
  //请求拦截器成功的回调
  (config) => {
    //config就是我们的请求报文,这个请求报文最后一定要返回回去，因为还要继续往下走
    //在这里,我们可以添加额外的功能,也可以给请求头添加需要的数据
    NProgress.start(); //开启进度条
    return config;
  }
  //请求拦截器中失败的回调一般不写，因为失败了，也就没有下文了
  // () => {
  // }
);

// Add a response interceptor  响应拦截器

service.interceptors.response.use(
  (response) => {
    //response 就是我们响应报文,我们也可以添加额外功能或者对响应报文进行处理
    NProgress.done(); //停止进度条
    return response.data; // 返回的响应不再需要从data属性当中拿数据, 而是响应就是我们要的数据;
  },
  (error) => {
    NProgress.done(); //停止进度条
    // 统一处理请求错误,
    alert("发送请求失败" + error.message || "未知错误");

    //统一处理完成之后，这个错误可以让后面继续处理，也可以不让后面继续处理
    // return Promise.reject(new Error("发送ajax请求失败")); //后面向继续处理这个错误，返回失败的promise
    //也可以不让后面 继续处理这个错误,中断promise链
    return new Promise(() => {}); //返回的是pending状态的promise，代表中断promise链，后期也就没办法处理了
  }
);

export default service;
