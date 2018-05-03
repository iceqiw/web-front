/**
  一些公共的action可以写在这里，比如用户登录、退出登录、权限查询等
  其他的action可以按模块不同，创建不同的js文件
**/

import Fetchapi from "../util/fetch-api"; // 自己写的工具函数，封装了请求数据的通用接口
import { message } from "antd";


export const actHouseData = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetchGet("/api/ds/all");
    dispatch({
      type: "ANA::house",
      payload: res.data
    });
    return res.data;
  } catch (err) {
    message.error("服务器开小差了");
  }
};
