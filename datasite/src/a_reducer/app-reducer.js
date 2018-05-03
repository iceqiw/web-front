/** app-reducer **/

/** store中的初始值 **/
const initState = {
  pageSize: 20, // 页面测试数据 初始值0
  totalSize: 0,
  pageNum: 1,
  fetchvalue: [], // 异步测试数据
  items: [],
  villages: [],
  totalinfo: {}
};

/** 对应的reducer处理函数，改变store中的值 **/
const actDefault = state => state;

const fetchData = (state, action) => {
  const { payload } = action;
  return Object.assign({}, state, {
    fetchvalue: payload
  });
};

const allItems = (state, action) => {
  const { payload } = action;
  return Object.assign({}, state, {
    items: payload
  });
};

const searchVillage = (state, action) => {
  const { payload } = action;
  return Object.assign({}, state, {
    villages: payload
  });
};

const pageItems = (state, action) => {
  const { payload } = action;
  return Object.assign({}, state, {
    items: payload.context,
    totalSize: payload.total,
    pageSize: payload.size,
    pageNum: payload.page
  });
};

const searchItems = (state, action) => {
  const { payload } = action;
  console.log(payload)
  return Object.assign({}, state, {
    totalinfo: payload
  });
};

/** 接收action触发的dispatch, 执行对应的reducer处理函数 **/
const reducerFn = (state = initState, action) => {
  switch (action.type) {
    case "ACT::login": // 测试页 - 保存异步请求的数据
      return fetchData(state, action);
    case "List::items": // 测试页 - 保存异步请求的数据
      return allItems(state, action);
    case "Page::items": // 测试页 - 保存异步请求的数据
      return pageItems(state, action);
    case "Total::info": // 测试页 - 保存异步请求的数据
      return searchItems(state, action);
    case "Village::list": // 测试页 - 保存异步请求的数据
      return searchVillage(state, action);
    default:
      return actDefault(state, action);
  }
};

export default reducerFn;
