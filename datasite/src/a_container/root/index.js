/** 根页 - 包含了根级路由 **/

// ==================
// 所需的各种插件
// ==================
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import P from "prop-types";
import history from "../history"; // 锚点模式的history
import Loadable from "react-loadable"; // 用于代码分割时动态加载模块

/** 普通组件 **/
import Loading from "../../a_component/loading"; // loading动画，用于动态加载模块进行中时显示

const Home = Loadable({
  loader: () => import("../home"),
  loading: Loading
});
const NotFound = Loadable({
  loader: () => import("../notfound"),
  loading: Loading
});
const Login = Loadable({
  loader: () => import("../login"),
  loading: Loading
});
const User = Loadable({
  loader: () => import("../user"),
  loading: Loading
});
const Register = Loadable({
  loader: () => import("../register"),
  loading: Loading
});

// ==================
// 组件
// ==================
@connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators({}, dispatch)
  })
)
export default class RootContainer extends React.Component {
  static propTypes = {
    dispatch: P.func,
    children: P.any
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Login.preload();
    Register.preload();
    User.preload();
  }

  /** 权限控制 **/
  onEnter(Component, props) {
    return <Component {...props} />;
  }

  render() {
    return [
      <Router history={history} key="history">
        <Route
          render={() => {
            return (
              <Switch>
                <Redirect exact from="/" to="/Home" />
                <Route
                  path="/Home"
                  render={props => this.onEnter(Home, props)}
                />
                <Route
                  path="/Login"
                  render={props => this.onEnter(Login, props)}
                />
                <Route
                  path="/Register"
                  render={props => this.onEnter(Register, props)}
                />
                <Route
                  path="/User"
                  render={props => this.onEnter(User, props)}
                />
                <Route component={NotFound} />
              </Switch>
            );
          }}
        />
      </Router>
    ];
  }
}
