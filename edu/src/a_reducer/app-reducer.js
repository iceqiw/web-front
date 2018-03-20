/** app-reducer **/

/** store中的初始值 **/
const initState = {
  num: 0, // 页面测试数据 初始值0
  fetchvalue: [], // 异步测试数据
  items:[]
};

/** 对应的reducer处理函数，改变store中的值 **/
const actDefault = state => state;

const testAdd = (state, action) => {
  const { payload } = action;
  return Object.assign({}, state, {
    num: payload
  });
};

const testFetch = (state, action) => {
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

/** 接收action触发的dispatch, 执行对应的reducer处理函数 **/
const reducerFn = (state = initState, action) => {
  switch (action.type) {
    case "TEST::add": // 测试页 - 按钮点击出发num改变
      return testAdd(state, action);
    case "TEST::testFetch": // 测试页 - 保存异步请求的数据
      return testFetch(state, action);
    case "TEST::fetch": // 测试页 - 保存异步请求的数据
      return testFetch(state, action);
    case "List::items": // 测试页 - 保存异步请求的数据
      console.log("--------item---------------")
      return allItems(state, action);
    default:
    
      return actDefault(state, action);
  }
};

export default reducerFn;
