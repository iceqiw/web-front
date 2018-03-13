/** 导航 **/

import React from "react";
import { NavLink } from "react-router-dom";
import css from "./index.scss";

export default class Menu extends React.PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={css.menu}>
        <NavLink to="/Home">首页</NavLink>|
        <NavLink to="/Login">登录</NavLink>|
        <NavLink to="/User">我的信息</NavLink>|
      </div>
    );
  }
}
