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
      type: "ACT::login",
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
    const res = await Fetchapi.newFetchGet("/api/ds/page/"+params.pn+"/10");
    dispatch({
      type: "Page::items",
      payload: res.data
    });
    return res.data;
  } catch (err) {
    message.error("服务器开小差了");
  }
};

export const actSearch = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetchGet("/api/ds/totalInfo");
    dispatch({
      type: "Total::info",
      payload: res.data
    });
    return res.data;
  } catch (err) {
    message.error("服务器开小差了");
  }
};

export const actVillageList = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetchGet("/api/ds/villages");
    dispatch({
      type: "Village::list",
      payload: res.data
    });
    return res.data;
  } catch (err) {
    message.error("服务器开小差了");
  }
};

export const actDelHouse = (params = {}) => async dispatch => {
  try {
    const d = await Fetchapi.newFetchDel("/api/ds/info/"+params.id);
    const res = await Fetchapi.newFetchGet("/api/ds/page/1/10");
    dispatch({
      type: "Page::items",
      payload: res.data
    });
    message.info("删除成功");
    return res.data;
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