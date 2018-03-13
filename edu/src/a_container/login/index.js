// ==================
// 所需的各种插件
// ==================
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import classNames from "classnames";
import P from "prop-types";
import LoginForm from "../../a_component/LoginForm";
import styles from "./index.less";

// ==================
// 组件
// ==================
@connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators({}, dispatch)
  })
)
export default class LoginPageContainer extends React.Component {
  static propTypes = {
    location: P.any,
    history: P.any,
    actions: P.any
  };
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.setState({
      height: document.body.clientHeight
    });
  }
  autoHeigth() {
    this.setState({
      height: document.body.clientHeight
    });
  }

  componentDidMount() {
    // 监听window窗口变化,自动调整左侧菜单的高度
    window.addEventListener('resize', this.autoHeigth.bind(this));
  }

  componentWillUnmount() {
    // 组件注销时,移除window的resize事件监听,释放浏览器内存
    window.removeEventListener('resize', this.autoHeigth.bind(this));
  }

  render() {
    var documentHeight = this.state.height - 64;
    return (
      <div className={styles.form}>
        <div className={styles.logo}>
          <span>TECH</span>
        </div>
        <LoginForm />
        <span><Link to="/Register" >注册</Link></span>
        <span>                     </span>
        <span><Link to="/Register" >忘记密码</Link></span>
      </div>
    );
  }
}
