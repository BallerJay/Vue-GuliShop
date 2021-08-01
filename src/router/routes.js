/*
 * @Author: SummerJay__
 * @Date: 2021-07-23 15:57:16
 * @LastEditTime: 2021-08-01 13:38:30
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\router\routes.js
 */

import Home from "@/pages/Home";
// const Home = () => import("@/pages/Home"); //import 函数可以让此文件单独打包，并且动态加载

import Login from "@/pages/Login";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import MyOrder from "@/pages/Center/MyOrder";
import GroupOrder from "@/pages/Center/GroupOrder";

/**
 * 使用import xxx from xxx 这样的方式是同步执行，将所有的路由组件一次性打包在一个大的文件当中
 * 这样打包之后，打包出来的文件体积比较大，当浏览器在访问这个文件加载的时候，效率不高
 *
 * 所以我们就想办法将所有的路由组件，分别打包为一个小的文件
 * 浏览器在访问哪个组件的时候，再去加载哪一个小的文件,效率就会提升
 * 这个过程就是我们所说的路由懒加载
 */

export default [
  {
    path: "/home",
    component: Home,
    //component 后面可以使一个组件，也可以是一个函数
    //这个函数当用户第一次访问Home组件的时候，就会执行Home函数
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
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      //只有携带了skuNum和sessionStorage内部有skuInfo数据，才能看到添加购物车成功的界面
      let skuNum = to.query.skuNum;
      let skuInfo = sessionStorage.getItem("SKUINFO_KEY");
      if (skuNum && skuInfo) {
        next();
      } else {
        alert("必须要携带skuNum参数，也必须得存储skuInfo");
        next("/");
        // next(false);//这个是什么都不做
      }
    },
  },
  {
    path: "/shopcart",
    component: ShopCart,
  },
  {
    path: "/trade",
    component: Trade,
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      //只有购物车页面才能跳到交易页面
      if (from.path === "/shopcart") {
        next();
      } else {
        alert("只有购物车页面才能跳到交易页面");
        next(false);
      }
    },
  },
  {
    path: "/pay",
    component: Pay,
    beforeEnter: (to, from, next) => {
      //只有从交易页面(创建订单)页面才能跳转到支付页面
      if (from.path === "/trade") {
        next();
      } else {
        alert("只有从交易页面(创建订单)页面才能跳转到支付页面");
        next(false);
      }
    },
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      if (from.path === "/pay") {
        // 只有从支付页面才能跳转到支付成功页面;
        next();
      } else {
        alert("只有从支付页面才能跳转到支付成功页面");
        next(false);
      }
    },
  },
  {
    path: "/center",
    component: Center,
    children: [
      {
        // path:'/center/myorder
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "grouporder",
        component: GroupOrder,
      },
      {
        path: "",
        redirect: "myorder",
      },
    ],
  },
  {
    // 定义重定向路由
    path: "/",
    redirect: "/home",
  },
];
