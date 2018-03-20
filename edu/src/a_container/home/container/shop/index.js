import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import P from "prop-types";
import { Button, message, Card, Row, Col, Input } from 'antd';
const Search = Input.Search;
const { Meta } = Card;

// ==================
// 本页面所需actions
// ==================
import { actIndex } from "../../../../a_action/app-action";

import styles from "./index.less";
// ==================
// 组件
// ==================
@connect(
  state => ({
    items:state.app.items
  }),
  dispatch => ({
    actions: bindActionCreators({ actIndex }, dispatch)
  })
)
export default class Shop extends React.Component {
  static propTypes = {
    items:P.array,
    actions: P.any
  };

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.actions.actIndex()
  }

  render() {
    return (
      <div>
        <Row type="flex" align="middle" justify="center">
          <Col xs={24} md={12}>
            <Search placeholder="input search text" enterButton="Search" size="large" />
          </Col>
        </Row>
        <div style={{ background: '#fff', margin: 24 }}>
          <Row type="flex" align="middle" justify="start" >
            {this.props.items.map((item, index) => (
              <Col key={index} xs={24} md={6}>
                <div style={{ background: '#fff', margin: 12 }} >
                  <Card
                    hoverable
                    cover={<img alt="example" src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1062989499,1682648318&fm=58" />}
                  >
                    <Link to={`/Home/UserDetail/${index}`} >
                      <Meta
                        title={item.id}
                        description={item.title}
                      />
                    </Link>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }
}
