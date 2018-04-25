import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import P from "prop-types";
import { Button } from 'antd';

// ==================
// 本页面所需actions
// ==================
import { actIndex } from "../../../../a_action/app-action";

// ==================
// 组件
// ==================
@connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators({ actIndex }, dispatch)
  })
)
export default class Page2 extends React.Component {
  static propTypes = {
    actions: P.any,
    history: P.any,
    match: P.any
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    console.log(this.props.match.params.id)
  }

  submitLogin(e) {
    this.props.actions.actIndex().then(res => {
      console.log(res);
    });
  }

  render() {
    return <div className="son">
    B 子container 2
    <h3>{this.props.match.params.id}</h3>
    <Button type="primary" style={{ width: "100%", height: 38, fontSize: 16 }} onClick={this.submitLogin.bind(this)}>登录</Button>
        
    </div>;
  }
}
