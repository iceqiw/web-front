import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import P from "prop-types";
import { Button, Form, Input, message } from 'antd';
import history from "../../a_container/history";

// ==================
// 本页面所需actions
// ==================
import { actLogin } from "../../a_action/app-action";

// ==================
// 组件
// ==================

const FormItem = Form.Item;

@connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators({ actLogin }, dispatch)
  })
)
@Form.create()
export default class LoginForm extends Component {
  static propTypes = {
    form: P.any,
    router: P.object,
    actions: P.any// connect高阶函数注入的actions，见本页面最下面的actions
  };
  constructor(props, context) {
    super(props, context);
  }

  noop() {
    return false;
  }

  submitLogin(e) {
    this.props.actions.actLogin(this.props.form.getFieldsValue()).then(res => {
      console.log(res);
      if (res) {
        sessionStorage.setItem("token", res.apiData);
        history.push('/home');
      }
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <Form horizontal="true">
        <FormItem>
          <Input type="text"
            {...getFieldProps('userName') }
            placeholder="账户"
            style={{ height: 38 }} />
        </FormItem>
        <FormItem>
          <Input type="password"
            {...getFieldProps('password') }
            autoComplete="off"
            placeholder="密码"
            style={{ height: 38 }}
            onContextMenu={this.noop}
            onPaste={this.noop}
            onCopy={this.noop}
            onCut={this.noop}
          />
        </FormItem>
        <FormItem>
          <Button type="primary" style={{ width: "100%", height: 38, fontSize: 16 }} onClick={this.submitLogin.bind(this)}>登录</Button>
        </FormItem>
      </Form>
    );
  }
};