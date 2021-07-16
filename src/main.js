/*
 * @Author: SummerJay__
 * @Date: 2021-07-16 15:52:41
 * @LastEditTime: 2021-07-16 18:39:30
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\main.js
 */
import Vue from "vue";
import App from "@/App";

//@ 是一个别名，是一个小名，代表的就是我们的src的路径

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
