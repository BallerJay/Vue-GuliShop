/*
 * @Author: SummerJay__
 * @Date: 2021-07-16 15:52:41
 * @LastEditTime: 2021-07-17 20:10:04
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\main.js
 */
import Vue from "vue";
import App from "@/App";
import router from "@/router";
import TypeNav from "@/components/TypeNav";

//@ 是一个别名，是一个小名，代表的就是我们的src的路径

Vue.config.productionTip = false;

//全局注册的组件，如果一个非路由组件被多个组件使用，那么定义在components文件夹，注册在全局
Vue.component("TypeNav", TypeNav);

new Vue({
  router: router, //我们所有的组件内部都可以使用this.$router和this.$route
  render: (h) => h(App),
}).$mount("#app");
