<!--
 * @Author: SummerJay__
 * @Date: 2021-07-17 20:02:36
 * @LastEditTime: 2021-07-23 09:56:33
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \gulishop-client\src\components\TypeNav\index.vue
-->

<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveOutDiv" @mouseenter="isShow = true">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                :class="{ item_on: currentIndex === index }"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="moveInItem(index)"
              >
                <h3>
                  <!-- <a href="">{{ c1.categoryName }}</a> -->
                  <!-- 第一种写法  把所有的a标签换成router-link
                      会造成卡段现象，因为组件标签太多了，导致内存当中
                      组件对象很多，所以效率不高
                 -->
                  <!-- <router-link
                  :to="{
                    name: 'search',
                    query: {
                      categoryId1: c1.categoryId,
                      categoryName: c1.categoryName,
                    },
                  }"
                  >{{ c1.categoryName }}</router-link
                > -->

                  <!-- 第二中写法，把声明式导航改成编程式导航 -->
                  <!-- <a
                  href="javascript:;"
                  @click="
                    $router.push({
                      name: 'search',
                      query: {
                        categoryId1: c1.categoryId,
                        categoryName: c1.categoryName,
                      },
                    })
                  "
                  >{{ c1.categoryName }}</a
                > -->

                  <!-- 事件委派处理 -->
                  <a
                    href="javascript:;"
                    :data-category1Id="c1.categoryId"
                    :data-categoryName="c1.categoryName"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="(c2, index) in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <!-- <a href="">{{ c2.categoryName }}</a> -->
                        <!-- <router-link
                        :to="{
                          name: 'search',
                          query: {
                            categoryId2: c2.categoryId,
                            categoryName: c2.categoryName,
                          },
                        }"
                        >{{ c2.categoryName }}</router-link
                      > -->
                        <!-- <a
                        href="javascript:;"
                        @click="
                          $router.push({
                            name: 'search',
                            query: {
                              categoryId2: c2.categoryId,
                              categoryName: c2.categoryName,
                            },
                          })
                        "
                        >{{ c2.categoryName }}</a
                      > -->

                        <a
                          href="javascript:;"
                          :data-category2Id="c2.categoryId"
                          :data-categoryName="c2.categoryName"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <!-- <a href="">{{ c3.categoryName }}</a> -->
                          <!-- <router-link
                          :to="{
                            name: 'search',
                            query: {
                              categoryId3: c3.categoryId,
                              categoryName: c3.categoryName,
                            },
                          }"
                          >{{ c3.categoryName }}</router-link
                        > -->
                          <!-- <a
                          href="javascript:;"
                          @click="
                            $router.push({
                              name: 'search',
                              query: {
                                categoryId3: c3.categoryId,
                                categoryName: c3.categoryName,
                              },
                            })
                          "
                          >{{ c3.categoryName }}</a
                        > -->
                          <a
                            href="javascript:;"
                            :data-category3Id="c3.categoryId"
                            :data-categoryName="c3.categoryName"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import _ from "lodash"; //这样引入会把整个lodash全部引入，打包后体积过大
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      isShow: true,
    };
  },
  mounted() {
    /**
     * 如果在这里发请求，只要home和search切换
     * 每次home和search内部都需要重新创建typeNav组件，mounted就会重新执行
     * 请求就会重复发，而三级分类列表数据是一样的，没必要发那么多次
     */
    // this.$store.dispatch("getCategoryList");
    // console.log(this);
    if (this.$route.path !== "/home") this.isShow = false;
  },

  methods: {
    //没节流时
    // moveInItem(index) {
    //   this.currentIndex = index;
    // },
    //节流后，传递的函数不能用箭头函数，因为箭头函数内部this不是组件对象
    moveInItem: throttle(
      function (index) {
        this.currentIndex = index;
        // console.log(index);
      },
      20,
      { trailing: false }
    ),

    //事件委派click的回调函数
    toSearch(event) {
      let targetNode = event.target; //获取我们的目标元素(真正发生事件的元素)
      // console.log(targetNode);
      //获取当前目标元素身上data-xx属性组成的对象
      let data = targetNode.dataset;
      /**
       * 如果点击的是a标签，那么data一定是有categoryid和categoryname的
       * 如果点的不是a标签，那么data就没有categoryid和categoryname
       */
      let { category1id, category2id, category3id, categoryname } = data;
      if (categoryname) {
        //categoryname存在说明点击的是a标签
        let location = {
          name: "search",
        };
        let query = {
          categoryName: categoryname,
        };
        //然后在确定是一级还是二级还是三级的id
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id3 = category3id;
        }
        //找到所有的query参数以后，最后把query放到location里面

        //合并query参数和params参数
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        location.query = query;

        //如果是从home也跳转search页,就push
        //如果是search页跳search页，就replace
        if (this.$route.path !== "/home") {
          this.$router.replace(location);
        } else {
          this.$router.push(location);
        }
      }
    },

    moveOutDiv() {
      this.currentIndex = -1;
      //在search组件里面，鼠标离开时需要让sort隐藏
      if (this.$route.path !== "/home") this.isShow = false;
    },
  },
  //现在要从Vuex当中把数据捞到vue组件当中使用
  //注意:只要是从vuex中拿数据，都在computed当中拿,就是拿vuex中state和getters中的东西
  //注意:只要是从vuex中拿方法(mutations和actions中的东西),都在methods当中去拿
  computed: {
    /**
     * 函数内部可以是数组也可以是对象
     * 是数组必须满足条件:
     *  1.数据直接就是在总的state当中的数据，不能是模块里面的
     *  2.数组当中的名字必须和state当中的名字一致
     * 所以此处...mapState(['categoryList'])不可行
     */
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>

<style lang='less' scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      &.sort-enter {
        height: 0;
        opacity: 0;
      }

      &.sort-enter-to {
        height: 461px;
        opacity: 1;
      }
      &.sort-enter-active {
        transition: 1s all;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 615px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: #ffeee5;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>

