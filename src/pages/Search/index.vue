<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-if="searchParams.keyWord">
              {{ searchParams.keyWord }}
              <i @click="removeKeyWord">×</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">×</i>
            </li>

            <li
              class="with-x"
              v-for="(prop, index) in searchParams.props"
              :key="prop"
            >
              {{ prop.split(":")[1] }}<i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @searchForTrademark="searchForTrademark"
          @searchForProps="searchForProps"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 第一步：先把背景色动态显示搞定 -->
              <!-- 第二步：再让图标可以动态显示 
              //1、用啥图标
              //2、图标什么时候出现    和背景色一样，谁有背景色，那么谁就有图标
              //3、图标是向上还是向下  和数据排序类型相关asc和desc
              -->
              <ul class="sui-nav">
                <!-- <li
                  :class="{ active: searchParams.order.split(':')[0] === '1' }"
                ></li> -->
                <!-- 第一步: 先把背景色动态显示搞定 -->
                <!-- 第二步: 再让图标可以动态显示 
                            1.用啥图标  
                            2.图标什么出现  和背景色一样，谁有背景色，那么谁就有图标
                -->
                <li :class="{ active: sortFlag === '1' }">
                  <a href="javascript:;" @click="changeSort('1')">
                    综合

                    <!-- 钩子标签，i标签其实就代表是我们的图标 -->
                    <i
                      v-if="sortFlag === '1'"
                      class="iconfont"
                      :class="{
                        icondown: sortType === 'desc',
                        iconup: sortType === 'asc',
                      }"
                    ></i>
                  </a>
                </li>
                <li
                  :class="{
                    active: sortFlag === '2',
                  }"
                >
                  <a href="javascript:;" @click="changeSort('2')">
                    价格
                    <i
                      v-if="sortFlag === '2'"
                      class="iconfont"
                      :class="{
                        icondown: sortType === 'desc',
                        iconup: sortType === 'asc',
                      }"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(goods, index) in goodsList"
                :key="goods.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="'/detail/' + goods.id">
                      <!-- <img v-lazy="goods.defaultImg" /> -->
                      <img :src="goods.defaultImg" />
                    </router-link>
                    <!-- <a href="item.html" target="_blank">
                      <img :src="goods.defaultImg" />
                    </a> -->
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="'/detail/' + goods.id">
                      {{ goods.title }}
                    </router-link>
                    <!-- <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >
                      {{ goods.title }}</a
                    > -->
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination
            :currentPageNo="searchParams.pageNo"
            :total="searchInfo.total"
            :pageSize="searchParams.pageSize"
            :continueNo="5"
            @changePageNo="changePageNo"
          ></Pagination>
          <!-- element-ui -->
          <!-- <el-pagination
            layout="prev, pager, next"
            :total="50">
          </el-pagination> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      searchParams: {
        //这个对象我们称作初始化所有的搜索参数
        //今后只要是作为搜索条件的，所有相关数据，全部先在这个对象内部初始化好
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyWord: "",
        props: [],
        trademark: "",
        //默认的搜索条件
        order: "1:desc", //排序规则，排序是后台排序的，我们搜索的时候得给后台一个默认的排序规则
        /**
         * order: "1:desc" 排序是根据这个来排的
         * 冒号前面代表的是排序标志   1.代表综合排序   2.代表价格排序
         * asc:升序  desc:降序
         */
        pageNo: 1, //搜索第几页的商品,分类也是后台做好的，我们也得告诉后台我们要第几个数据
        pageSize: 8, //每页多少个商品，告诉后台，每页回来多少个商品，默认10个
      },
    };
  },

  beforeMount() {
    //再点击三级分类或者点击搜索按钮跳过来发请求之前，把对应的三级分类名称和id或者关键字keyWord拿到
    //添加到searchParams对应的搜索项当中
    this.handleSearchParams();
  },

  mounted() {
    this.getSearchInfo();
  },
  methods: {
    getSearchInfo() {
      /**
       * dispatch 如果传递多个参数，那么多个参数必须构成一个对象去传递
       * 也就是说  dispatch只能传递一个参数 */
      /**
       * 这里刚开始传空对象只是为了获取数据展示页面
       * 但是我们点击三级分类或者点击搜索按钮跳过来search页面的时候，就已经是有搜索条件了
       * 点击三级分类跳转那么搜索条件就应该是三级分类的id和分类的名称
       * 点击搜索按钮跳转那么搜索条件就应该是自己输入的关键字
       * 所以这个请求，参数不应该是空对象
       * this.$store.dispatch("getSearchInfo", {});
       */
      this.$store.dispatch("getSearchInfo", this.searchParams);
    },

    handleSearchParams() {
      let { category1Id, category2Id, category3Id, categoryName } =
        this.$route.query;
      let { keyWord } = this.$route.params;
      let searchParams = {
        ...this.searchParams,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        keyWord,
      };

      //赋值给this.searchParams之前，最好把属性值为空串的属性干掉
      //遍历对象最快的方法就是使用forEach，是把对象属性转化为数组然后进行遍历
      //只要以后看到Object.keys(xx),就是为了让对象可以使用forEach方法来高效遍历
      Object.keys(searchParams).forEach((key) => {
        if (searchParams[key] === "") {
          delete searchParams[key];
        }
      });
      this.searchParams = searchParams;
    },
    //删除分类名称搜索条件,重新发送请求
    removeCategoryName() {
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.searchParams.categoryName = undefined;
      // this.getSearchInfo();
      //这里删除以后不会动我的原来路径，所以这样发请求不行，我们得让路径发生变化
      //所以发送请求的时候，要删除对应的参数
      // this.$route.push({
      //   name: "search",
      //   params: this.$route.params,
      // });

      this.searchParams.pageNo = 1;

      this.$route.replace({
        name: "search",
        params: this.$route.params,
      });
      //注意====此处路径变化了为什么就发送请求了，是因为这里发请求依赖的是watch里面的代码
    },
    //删除关键字的搜索条件,重新发送请求
    removeKeyWord() {
      this.searchParams.keyWord = undefined;
      this.$bus.$emit("clearKeyWord"); //通知到Header组件清空keyWord
      // this.getSearchInfo();
      // this.$route.push({
      //   name: "search",
      //   query: this.$route.query,
      // });

      this.searchParams.pageNo = 1;

      this.$route.replace({
        name: "search",
        query: this.$route.query,
      });
      //注意====此处路径变化了为什么就发送请求了，是因为这里发请求依赖的是watch里面的代码
    },
    //用户点击品牌后，根据品牌搜索重新发送请求
    searchForTrademark(trademark) {
      this.searchParams.pageNo = 1;
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getSearchInfo();
    },
    //这是删除品牌trademark搜索条件后，重新发送请求
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.searchParams.pageNo = 1;
      this.getSearchInfo();
    },
    //用户点击平台属性，根据平台属性搜索重新发送请求
    searchForProps(attrValue, attr) {
      let prop = `${attr.attrid}:${attrValue}:${attr.attrName}`;
      // this.searchParams.props.push(prop);
      // this.getSearchInfo();
      //此处出现bug,当用户连续点击时，会重复添加属性
      //所以我们需要判断数组当中是否已经存在当前这个属性，如果有了就不要再去发请求了
      let isRepeat = this.searchParams.props.some((item) => item === prop);
      if (isRepeat) {
        return;
      }
      this.searchParams.pageNo = 1;
      this.searchParams.props.push(prop);
      this.getSearchInfo();
    },
    //用户删除某个属性搜索条件，重新发送请求
    removeProp(index) {
      this.searchParams.props.splice(index, 1);
      this.searchParams.pageNo = 1;
      this.getSearchInfo();
    },
    //点击综合或者价格变换排序方式的回调
    changeSort(sortFlag) {
      //首先我们需要判断用户点击的是不是和原来的排序标志一样
      //获取到原来的排序标志和类型
      // let originSortFlag = this.searchParams.order.split(":")[0];
      // let originSortType = this.searchParams.order.split(":")[1];
      let originSortFlag = this.sortFlag;
      let originSortType = this.sortType;
      let newOrder = "";
      //判断用户点击的是不是还是原来的综合或者价格
      if (sortFlag === originSortFlag) {
        //假设用户点击的排序和原来的是一样的，证明点击的还是同一个排序，那么我们需要把排序类型转变
        newOrder = `${originSortFlag}:${
          originSortType === "asc" ? "desc" : "asc"
        }`;
      } else {
        //假设用户点击的排序标志和原来的不一样,证明点击的不是用一个排序，那么我们需要把排序标志改变，排序类型默认
        newOrder = `${sortFlag}:desc`;
      }
      this.searchParams.order = newOrder;
      this.searchParams.pageNo = 1;
      this.getSearchInfo();
    },
    //分页器点击切换页码的时候，触发的自定义事件回调
    changePageNo(pageNo) {
      this.searchParams.pageNo = pageNo;
      this.getSearchInfo();
    },
  },
  computed: {
    ...mapGetters(["goodsList"]),
    ...mapState({
      searchInfo: (state) => state.search.searchInfo,
    }),
    sortFlag() {
      return this.searchParams.order.split(":")[0];
    },
    sortType() {
      return this.searchParams.order.split(":")[1];
    },
  },
  watch: {
    $route(newVal, oldVal) {
      this.handleSearchParams();
      this.getSearchInfo();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>