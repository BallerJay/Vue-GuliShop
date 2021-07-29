/*
 * @Author: SummerJay__
 * @Date: 2021-07-23 15:57:16
 * @LastEditTime: 2021-07-29 08:20:43
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\router\routes.js
 */

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";

export default [
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
    path: "/search/:keyWord?",
    component: Search,
    name: "search",
    props: true,
  },
  {
    path: "/register",
    component: Register,
    meta: {
      isHidden: "true",
    },
  },
  {
    path: "/detail/:goodsId",
    component: Detail,
  },
  {
    path: "/addCartSuccess",
    component: AddCartSuccess,
  },
  {
    path: "/shopcart",
    component: ShopCart,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/trade",
    component: Trade,
  },
  {
    path: "/pay",
    component: Pay,
  },
  {
    // 定义重定向路由
    path: "/",
    redirect: "/home",
  },
];
