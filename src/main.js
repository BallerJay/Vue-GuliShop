/*
 * @Author: SummerJay__
 * @Date: 2021-07-16 15:52:41
 * @LastEditTime: 2021-07-17 09:45:02
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\main.js
 */
import Vue from "vue";
import App from "@/App";
import router from "@/router";

//@ 是一个别名，是一个小名，代表的就是我们的src的路径

Vue.config.productionTip = false;

new Vue({
  router: router, //我们所有的组件内部都可以使用this.$router和this.$route
  render: (h) => h(App),
}).$mount("#app");
