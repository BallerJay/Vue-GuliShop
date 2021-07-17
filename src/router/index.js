/*
 * @Author: SummerJay__
 * @Date: 2021-07-17 09:38:11
 * @LastEditTime: 2021-07-17 15:12:15
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\router\index.js
 */

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/login",
      component: Login,
      //是路由对象当中的元配置项，可以配置我们所需要的任何数据
      meta: {
        isHidden: "true",
      },
    },
    {
      path: "/search",
      component: Search,
    },
    {
      path: "/register",
      component: Register,
      meta: {
        isHidden: "true",
      },
    },
    {
      // 定义重定向路由
      path: "/",
      redirect: "/home",
    },
  ],
});

export default router;
