/*
 * @Author: SummerJay__
 * @Date: 2021-07-16 15:52:41
 * @LastEditTime: 2021-08-01 09:33:30
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\main.js
 */
import Vue from "vue";
import App from "@/App";
import router from "@/router";
import TypeNav from "@/components/TypeNav";
import SlideLoop from "@/components/SlideLoop";
import Pagination from "@/components/Pagination";
import store from "@/store";
import "@/mock/mockServer"; //引入mockServer，让模拟的接口生效
import "swiper/css/swiper.css"; //引入swiper的css
// import "@/api"; //验证接口请求函数时使用,第一种方法
// import { reqCategoryList } from "@/api"; //验证接口请求函数时使用,第二种方法
// reqCategoryList();

import * as API from "@/api";

//图片懒加载s
import VueLazyload from "vue-lazyload";
import loading from "@/assets/images/loading.gif";
//在图片界面没有进入到可视范围前不加载，在没有得到图片前先显示loading图片
Vue.use(VueLazyload, {
  //内部自定义了一个指令lazy
  loading, //指定未加载得到图片之前的loading图片
});

import "@/utils/validate";

/**
 * element-ui 当中分为两种组件
 * 第一种组件就和下面这个Button一样，可以引入然后全局注册
 *
 * 第二种组件就和MessageBox类似，引入之后不能直接注册，而是挂载Vue的原型上使用
 */
import { Button, MessageBox, Message } from "element-ui";
// Vue.use(Button);
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message; //用于做提示消息

//@ 是一个别名，是一个小名，代表的就是我们的src的路径

Vue.config.productionTip = false;

//全局注册的组件，如果一个非路由组件被多个组件使用，那么定义在components文件夹，注册在全局
Vue.component("TypeNav", TypeNav);
Vue.component("SlideLoop", SlideLoop);
Vue.component("Pagination", Pagination);

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this; //安装总线，代表任何组件内部都可以通过this.$bus访问到vm实例
    Vue.prototype.$API = API;
  },
  router: router, //我们所有的组件内部都可以使用this.$router和this.$route
  store: store,
  render: (h) => h(App),
}).$mount("#app");
