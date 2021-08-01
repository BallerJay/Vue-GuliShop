/*
 * @Author: SummerJay__
 * @Date: 2021-08-01 09:18:13
 * @LastEditTime: 2021-08-01 09:48:32
 * @LastEditors: your name
 * @Description:
 * @FilePath: \gulishop-client\src\utils\validate.js
 */

import Vue from "vue";
import VeeValidate from "vee-validate";
import zh_CN from "vee-validate/dist/locale/zh_CN";
Vue.use(VeeValidate);

//错误提示信息本地化
VeeValidate.Validator.localize("zh_CN", {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`, //修改内置规则的message,让确实密码和密码相同
  },
  attributes: {
    //给校验的field属性名映射中文名称
    phone: "手机号",
    code: "验证码",
    password: "密码",
    password2: "确认密码",
    isCheck: "协议",
  },
});

//定义协议必须打钩同意
VeeValidate.Validator.extend("agree", {
  validate: (value) => {
    return value;
  },
  getMessage: (field) => field + "必须同意",
});
