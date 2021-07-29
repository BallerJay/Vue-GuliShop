/*
 * @Author: SummerJay__
 * @Date: 2021-07-16 15:52:41
 * @LastEditTime: 2021-07-29 14:22:54
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\babel.config.js
 */
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
  ],
};
