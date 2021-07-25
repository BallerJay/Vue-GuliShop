/*
 * @Author: SummerJay__
 * @Date: 2021-07-17 09:38:11
 * @LastEditTime: 2021-07-23 16:09:36
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\router\index.js
 */

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import routes from "./routes";

/**
 * VueRouter 是路由器对象的构造函数
 * this.$router.push 调用的是路由器对象的方法，这个方法并不是路由器实例化对象的方法，而是这个对象原型的方法
 *  这个实例化对象原型的方法，就是VueRouter的是显式原型的方法
 *  this.$router是实例化对象，是VueRouter的实例化对象
 */

//将原有的push方法地址，保存起来，后期还能拿到原来的
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;
//接下里就可以大胆的修改原型的push，让原型的push指向另外一个函数
VueRouter.prototype.push = function(location, onResolved, onRejected) {
  //location就是我们调用 this.$router.push 传递过来的对象
  if (onResolved === undefined && onRejected === undefined) {
    //证明调用的时候只传递了个匹配路由对象，没有传递成功或者失败的回调
    return originPush.call(this, location).catch(() => {});
  } else {
    //证明调用的时候传递了成功或者失败的回调,或者都有
    return originPush.call(this, location, onResolved, onRejected);
  }
};

VueRouter.prototype.replace = function(location, onResolved, onRejected) {
  //location就是我们调用 this.$router.push 传递过来的对象
  if (onResolved === undefined && onRejected === undefined) {
    //证明调用的时候只传递了个匹配路由对象，没有传递成功或者失败的回调
    return originReplace.call(this, location).catch(() => {});
  } else {
    //证明调用的时候传递了成功或者失败的回调,或者都有
    return originReplace.call(this, location, onResolved, onRejected);
  }
};

// const router = new VueRouter({
//   routes: [
//     {
//       path: "/home",
//       component: Home,
//     },
//     {
//       path: "/login",
//       component: Login,
//       //是路由对象当中的元配置项，可以配置我们所需要的任何数据
//       meta: {
//         isHidden: "true",
//       },
//     },
//     {
//       path: "/search/:keyWord?",
//       component: Search,
//       name: "search",
//       props: true,
//     },
//     {
//       path: "/register",
//       component: Register,
//       meta: {
//         isHidden: "true",
//       },
//     },
//     {
//       path: "/detail/:goodsId",
//       component: Detail,
//     },
//     {
//       // 定义重定向路由
//       path: "/",
//       redirect: "/home",
//     },
//   ],
// });

export default new VueRouter({
  routes: routes,
  //配置滚动行为，跳转到新的路由界面滚动条的位置
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
