/*
 * @Author: SummerJay__
 * @Date: 2021-07-19 23:03:43
 * @LastEditTime: 2021-07-19 23:07:36
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\mock\mockServe.r.js
 */

// 此文件用于专门模拟mock数据接口
import Mock from "mockjs";
import banner from "./banner.json";
import floor from "./floor.json";

// 第一个参数，代表我们以后请求的路径，第二个参数代表返回的数据
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });
