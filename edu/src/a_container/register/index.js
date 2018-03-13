// ==================
// 所需的各种插件
// ==================
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import P from "prop-types";
import css from "./index.scss";

// ==================
// 组件
// ==================
@connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators({}, dispatch)
  })
)
export default class RegisterPageContainer extends React.Component {
  static propTypes = {
    location: P.any,
    history: P.any,
    actions: P.any
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
      <NavLink to="/Home">首页</NavLink>|
      <div className={css.loginwrapper}>
       Register
      </div>
      </div>
    );
  }
}