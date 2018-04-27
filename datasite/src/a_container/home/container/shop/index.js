import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import P from "prop-types";
import { Button, message, Card, Row, Col, Input, Pagination,Carousel } from 'antd';

const Search = Input.Search;
const { Meta } = Card;

// ==================
// 本页面所需actions
// ==================
import { actIndex, actSearch } from "../../../../a_action/app-action";

import styles from "./index.less";
// ==================
// 组件
// ==================
@connect(
  state => ({
    totalSize: state.app.totalSize,
    pageSize: state.app.pageSize,
    pageNum: state.app.pageNum,
    content: state.app.items,
    max: state.app.max,
    avg: state.app.avg,
    min: state.app.min
  }),
  dispatch => ({
    actions: bindActionCreators({ actIndex, actSearch }, dispatch)
  })
)
export default class Shop extends React.Component {
  static propTypes = {
    content: P.array,
    actions: P.any,
    pageSize: P.number,
    totalSize: P.number,
    pageNum: P.number,
    max: P.any,
    min: P.any,
    avg: P.any,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.actIndex({ pn: 1 })
    this.props.actions.actSearch()
  }

  onChange = (pageNumber) => {
    this.props.actions.actIndex({ pn: pageNumber })
  }

  onSearch = (key) => {
    this.props.actions.actIndex({ pn: 1 })
  }

  render() {
    return (
      <div>
        <Row type="flex" align="middle" justify="center">
          <Col xs={24} md={12}>
            <Search placeholder="input search text" enterButton="搜索" size="large" onSearch={this.onSearch.bind(this)} />
            <Carousel autoplay>
              <div><h1>MAX:{this.props.max}</h1></div>
              <div><h1>AVG:{this.props.avg}</h1></div>
              <div><h1>MIN:{this.props.min}</h1></div>
            </Carousel>
          </Col>
        </Row>
        <div style={{ background: '#fff', margin: 24 }}>
          <Row type="flex" align="middle" justify="start" >
            {this.props.content.map((item, index) => (
              <Col key={index} xs={24} md={6}>
                <div style={{ background: '#fff', margin: 12 }} >
                <Card title={item.datetime}  style={{ width: 300 }}>
                  <p>{item.price+"（元/平米）"}</p>
                  <a href={item.link} >
                      <Meta
                        title={item.price_total+"万"}
                        description={item.name  }
                      />
                      <em>{item.village}</em>
                  </a>
                </Card>
                </div>
              </Col>
            ))}
          </Row>
          <Row type="flex" align="middle" justify="center">
            <Pagination  current={this.props.pageNum} total={this.props.totalSize} onChange={this.onChange} pageSize={this.props.pageSize} />
          </Row>
        </div>
      </div>
    );
  }
}
