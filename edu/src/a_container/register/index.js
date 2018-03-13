// ==================
// 所需的各种插件
// ==================
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import P from "prop-types";
import { Layout, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
import styles from "./index.less";

const { Header, Content, Footer } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

// ==================
// 本页面所需actions
// ==================
import { actReg } from "../../a_action/app-action";

// ==================
// 组件
// ==================
@connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators({ actReg }, dispatch)
  })
)
@Form.create()
export default class RegisterPageContainer extends React.Component {
  static propTypes = {
    form: P.any,
    router: P.object,
    history: P.any,
    actions: P.any// connect高阶函数注入的actions，见本页面最下面的actions
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  submitLogin(e) {
    this.props.actions.actReg(this.props.form.getFieldsValue()).then(res => {
      console.log(res);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.actReg(values).then(res => {
          if (res.apiData) {
            console.log(res);
            this.props.history.push('/home');
          }
        });
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmpwd'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
      );
    return (
      <div>
        <Layout>
          <Header>
            <Row type="flex" align="middle" >
              <Col xs={4} md={1}>
                <NavLink to='/Home'><Icon type="home" /></NavLink>
              </Col>
            </Row>
          </Header>
          <Content>
            <div className={styles.divcolor}>
              <h2>请填写注册信息</h2>
              <Form onSubmit={this.handleSubmit}>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                      UserName&nbsp;
              <Tooltip title="What do you want others to call you?">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  )}
                >
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your UserName!', whitespace: true }],
                  })(
                    <Input />
                    )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="E-mail"
                >
                  {getFieldDecorator('email', {
                    rules: [{
                      type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                      required: true, message: 'Please input your E-mail!',
                    }],
                  })(
                    <Input />
                    )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Password"
                >
                  {getFieldDecorator('password', {
                    rules: [{
                      required: true, message: 'Please input your password!',
                    }, {
                      validator: this.validateToNextPassword,
                    }],
                  })(
                    <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Confirm Password"
                >
                  {getFieldDecorator('confirmpwd', {
                    rules: [{
                      required: true, message: 'Please confirm your password!',
                    }, {
                      validator: this.compareToFirstPassword,
                    }],
                  })(
                    <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="Phone Number"
                >
                  {getFieldDecorator('telphone', {
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                  })(
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  {getFieldDecorator('agreement', {
                    valuePropName: 'checked',
                  })(
                    <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
              </Form>
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}