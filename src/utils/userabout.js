/*
 * @Author: SummerJay__
 * @Date: 2021-07-25 10:53:37
 * @LastEditTime: 2021-07-25 11:18:44
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\utils\userabout.js
 */
import { v4 as uuidv4 } from "uuid";
//这个文件是和用户相关的一些工具函数
//专门用来生成用户的临时标识
//一般用户的临时标识都是唯一的,而且一旦生成不会轻易改变
export function getUserTempId() {
  //先从localStorage当中获取用户的临时标识
  //localStorage获取不到数据返回的是null
  let userTempId = localStorage.getItem("USERTEMPID_KEY");
  //如果获取到了，直接返回使用
  if (!userTempId) {
    //如果没有获取到，在通过uuid重新创建，并且存储到localStorage
    userTempId = uuidv4();
    localStorage.setItem("USERTEMPID_KEY", userTempId);
  }

  return userTempId;
}
