<!--
 * @Author: SummerJay__
 * @Date: 2021-07-16 15:52:41
 * @LastEditTime: 2021-07-19 16:09:25
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \gulishop-client\src\App.vue
-->
<template>
  <div>
    <Header />
    <router-view></router-view>
    <!-- 可以这样写，但是不推荐，因为如果后期有很多的页面都不需要显示Footer，那么代码就会写很长-->
    <!-- <Footer v-show="$route.path !== '/login' && $route.path !== '/register'" /> -->
    <Footer v-show="!$route.meta.isHidden" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //在此发请求去获取三级分类的数据，那么只会发一次，而且一次就够了，因为数据不变
    this.$store.dispatch("getCategoryList");
  },
};
</script>

<style>
</style>