<!--
 * @Author: SummerJay__
 * @Date: 2021-07-17 09:33:52
 * @LastEditTime: 2021-07-17 20:46:02
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \gulishop-client\src\pages\Home\index.vue
-->

<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Rank />
    <Like />
    <Floor />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import TodayRecommend from "./TodayRecommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
export default {
  name: "Home",
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
};
</script>

<style>
</style>
