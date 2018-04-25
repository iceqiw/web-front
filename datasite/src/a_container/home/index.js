/** 主页 **/

// ==================
// 所需的各种插件
// ==================
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Route, Switch, NavLink } from "react-router-dom";
import classNames from "classnames";
import P from "prop-types";
import { Layout, message, Row, Col, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
// ==================
// 所需的所有资源
// ==================
import css from "./index.less";
import Shop from "./container/shop"; // 子页面1
import UserDetail from "./container/page2"; // 子页面2
import Page3 from "./container/page3"; // 子页面3

// ==================
// 组件
// ==================
@connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators({}, dispatch)
  })
)
export default class HomePageContainer extends React.Component {
  static propTypes = {
    actions: P.any,
    match: P.any
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderLogin() {
    if (sessionStorage.getItem("token")) {
      return (<NavLink to="/User" ><Icon type="profile" /></NavLink>);
    }
    return (<NavLink to="/Login" ><Icon type="user" /></NavLink>);
  }

  render() {
    return (
      <div>
        <Layout>
          <Header>
            <Row type="flex" align="middle" >
              <Col xs={4} md={1}>
                <NavLink to={`${this.props.match.url}/Shop`}><Icon type="home" /></NavLink>
              </Col>
              <Col xs={4} md={1}>
                {this.renderLogin()}
              </Col>
            </Row>
          </Header>
          <Content>
            <div style={{ background: '#fff', padding: 14, minHeight: 768 }}>
              <Switch>
                <Route
                  exact
                  path={`${this.props.match.url}/`}
                  component={Shop}
                />
                <Route
                  exact
                  path={`${this.props.match.url}/Shop`}
                  component={Shop}
                />
                <Route
                  exact
                  path={`${this.props.match.url}/UserDetail/:id`}
                  component={UserDetail}
                />
              </Switch>
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}
