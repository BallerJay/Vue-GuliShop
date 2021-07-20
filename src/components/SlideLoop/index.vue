<!--
 * @Author: SummerJay__
 * @Date: 2021-07-20 15:29:19
 * @LastEditTime: 2021-07-20 15:47:36
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \gulishop-client\src\components\SlideLoop\index.vue
-->

<template>
  <div class="swiper-container" id="mySwiper" ref="bannerSwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(item, index) in bannerList"
        :key="item.id"
      >
        <img :src="'.' + item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  name: "SlideLoop",
  props: ["bannerList"],
  watch: {
    bannerList: {
      immediate: true,
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          new Swiper(this.$refs.bannerSwiper, {
            // direction: "vertical", // 垂直切换选项  去掉就代表轮播图是水平的
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            // scrollbar: {
            //   el: ".swiper-scrollbar",
            // },
          });
        });
      },
    },
  },
};
</script>
<style>
</style>
