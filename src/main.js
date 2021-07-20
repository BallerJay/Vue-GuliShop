/*
 * @Author: SummerJay__
 * @Date: 2021-07-16 15:52:41
 * @LastEditTime: 2021-07-19 23:20:54
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\main.js
 */
import Vue from "vue";
import App from "@/App";
import router from "@/router";
import TypeNav from "@/components/TypeNav";
import store from "@/store";
import "@/mock/mockServer"; //引入mockServer，让模拟的接口生效
// import "@/api"; //验证接口请求函数时使用,第一种方法
// import { reqCategoryList } from "@/api"; //验证接口请求函数时使用,第二种方法
// reqCategoryList();

//@ 是一个别名，是一个小名，代表的就是我们的src的路径

Vue.config.productionTip = false;

//全局注册的组件，如果一个非路由组件被多个组件使用，那么定义在components文件夹，注册在全局
Vue.component("TypeNav", TypeNav);

new Vue({
  router: router, //我们所有的组件内部都可以使用this.$router和this.$route
  store: store,
  render: (h) => h(App),
}).$mount("#app");
