// ==================
// 所需的各种插件
// ==================
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, hashHistory } from "react-router";
import classNames from "classnames";
import P from "prop-types";
import LoginForm from "../../a_component/LoginForm";
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
      <div className={css.loginwrapper}>
        <LoginForm />
      </div>
    );
  }
}