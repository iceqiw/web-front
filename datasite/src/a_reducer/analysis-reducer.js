/** app-reducer **/
/** store中的初始值 **/
const initState = {
  houseinfo: []
};

/** 对应的reducer处理函数，改变store中的值 **/
const actDefault = state => state;

const fetchData = (state, action) => {
  const { payload } = action;
  return Object.assign({}, state, {
    houseinfo: payload
  });
};

/** 接收action触发的dispatch, 执行对应的reducer处理函数 **/
const reducerFn = (state = initState, action) => {
  switch (action.type) {
    case "ANA::house": // 测试页 - 保存异步请求的数据
      return fetchData(state, action);
    default:
      return actDefault(state, action);
  }
};

export default reducerFn;
