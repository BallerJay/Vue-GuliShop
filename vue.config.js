/*
 * @Author: SummerJay__
 * @Date: 2021-07-16 18:30:57
 * @LastEditTime: 2021-08-01 14:08:40
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\vue.config.js
 */

//此模块是基于webpack配置的，如有问题可以去webpack官网查询
module.exports = {
  lintOnSave: false, //禁用eslint
  devServer: {
    proxy: {
      "/api/v2": {
        target: "http://121.5.235.28:8888",
        // pathRewrite: { "^/api/v2": "" }, //此处要不要去掉/api/v2，取决于接口路径里面有没有，如果有，就不可以去除;没有，就可以去除
      },
    },
  },
};
