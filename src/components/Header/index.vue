<!--
 * @Author: SummerJay__
 * @Date: 2021-07-17 09:05:15
 * @LastEditTime: 2021-07-31 10:30:05
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \gulishop-client\src\components\Header\index.vue
-->

<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="$store.state.user.userInfo.name">
            <span>欢迎您</span>
            <a href="javascript::">{{ $store.state.user.userInfo.name }}</a>
            <a href="javascript::" class="register" @click="logout">退出登录</a>
          </p>

          <p v-else>
            <span>请</span>
            <!-- <a href="###">登录</a>
            <a href="###" class="register">免费注册</a> -->
            <router-link to="/login">登陆</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <!-- <a href="###">我的订单</a> -->
          <router-link to="/center">我的订单</router-link>
          <!-- <a href="###">我的购物车</a> -->
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home"
          ><img src="./images/logo.png" alt=""
        /></router-link>
        <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
          
        </a> -->
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyWord"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="toSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyWord: "",
    };
  },
  methods: {
    toSearch() {
      // this.$router.push("/search/" + this.keyWord);
      /**
       * 一.路由传参种类:params参数和query参数
       *    params参数是属于路径的一部分，路由当中匹配的时候，是要照顾到这个参数的
       *    query参数是在路径后面，以 ? 分割, ？ 后面的 a = b & c = d 就是你的query参数
       *    query是不属于路径的一部分，路由匹配的时候，不需要关心这个参数
       * 二. 路由路径参数的三种写法
       *    1.字符串写法
       *      this.$router.push("/search/" + this.keyWord);
       *    2.模板字符串
       *       this.$router.push(`/search/${this.keyWord}`);
       *    3.对象写法(重点)
       *        this.$router.push({name:'search',params:{keyWord:this.keyWord},query:{keyWord1:this.keyWord.toUpperCase()}})
       */
      let location = {
        name: "search",
        params: { keyWord: this.keyWord || undefined },
      };
      if (this.$route.query) {
        location.query = this.$route.query;
      }
      // this.$router.push(location);
      //如果是从home也跳转search页,就push
      //如果是search页跳search页，就replace
      if (this.$route.path !== "/home") {
        this.$router.replace(location);
      } else {
        this.$router.push(location);
      }

      this.keyWord = "";
    },
    clearKeyWord() {
      this.keyWord = "";
    },
    //退出登录
    logout() {
      try {
        this.$store.dispatch("userLogout");
        alert("退出登录成功");
        this.$router.push("/");
      } catch (error) {
        alert("退出登录失败");
      }
    },
  },
  mounted() {
    this.$bus.$on("clearKeyWord", this.clearKeyWord);
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
