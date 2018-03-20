/**
  一些公共的action可以写在这里，比如用户登录、退出登录、权限查询等
  其他的action可以按模块不同，创建不同的js文件
**/

import Fetchapi from "../util/fetch-api"; // 自己写的工具函数，封装了请求数据的通用接口
import { message } from "antd";

/** 异步请求测试 fetch **/
export const actLogin = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetchPost("/api/user/login", params);
    dispatch({
      type: "TEST::fetch",
      payload: res.data
    });
    return res.data;
  } catch (err) {
    message.error("登录失败");
  }
};


/** 异步请求测试 fetch **/
export const actIndex = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetchGet("/api/tech/index/list");
    console.log(res)
    dispatch({
      type: "List::items",
      payload: res.data.apiData.content
    });
    return res.apiData;
  } catch (err) {
    message.error("服务器开小差了");
  }
};

/** 异步请求测试 fetch **/
export const actReg = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetchPost("/api/user/reg", params);
    dispatch({
      type: "TEST::fetch",
      payload: res.data
    });
    return res.data;
  } catch (err) {
    message.error("注册失败");
  }
};