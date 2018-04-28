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
import { actIndex, actSearch,actVillageList,actDelHouse } from "../../../../a_action/app-action";

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
    villages: state.app.villages,
    totalinfo: state.app.totalinfo
  }),
  dispatch => ({
    actions: bindActionCreators({ actIndex, actSearch ,actVillageList,actDelHouse}, dispatch)
  })
)
export default class Shop extends React.Component {
  static propTypes = {
    content: P.array,
    villages: P.array,
    actions: P.any,
    pageSize: P.number,
    totalSize: P.number,
    pageNum: P.number,
    totalinfo: P.any
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.actIndex({ pn: 1 })
    this.props.actions.actSearch()
    this.props.actions.actVillageList()
  }

  onChange = (pageNumber) => {
    this.props.actions.actIndex({ pn: pageNumber })
    this.props.actions.actSearch()
  }

  delHouse = (id) => {
    this.props.actions.actDelHouse({ id: id })
  }

  render() {
    return (
      <div>
        <Row type="flex" align="middle" justify="center">
            <Col xs={24} md={12}>
              <Carousel  className={styles.mycarousel2} autoplay>
                {this.props.villages.map((village, index) => (
                  <div key={index} ><h2>{village}</h2></div>
                ))}
              </Carousel>
            </Col>
        </Row>
        <Row type="flex" align="middle" justify="center">
          <Col  onClick={this.onChange.bind(this,1)}  xs={24} md={12}>
            <Carousel className={styles.mycarousel} autoplay>
              <div><h2>单价MAX:{this.props.totalinfo.max}(元/平米)</h2></div>
              <div><h2>单价MIN:{this.props.totalinfo.min}(元/平米)</h2></div>
              <div><h2>单价AVG:{this.props.totalinfo.min}(元/平米)</h2></div>
            </Carousel>
          </Col>
        </Row>
        <div style={{ background: '#fff', margin: 24 }}>
          <Row type="flex" align="middle" justify="start" >
            {this.props.content.map((item, index) => (
              <Col key={index} xs={24} md={6}>
                <div style={{ background: '#fff', margin: 12 }} >
                  <a href={item.link} >
                    <Card title={item.price_total+"万"}>
                      <p>单价：{item.price+"(元/平米)"}</p>
                      <p>租金：{item.rent+"(元/月)"}</p>
                      <p>小区：{item.village}</p>
                      <p>楼层：{item.floor}</p>
                      <p>面积：{item.acreage+"平米"}</p>
                      <p>介绍：{item.name}({item.datetime})</p>
                      <Button type="danger" onClick={this.delHouse.bind(this,item.id)}>删除</Button>
                    </Card>
                  </a>
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
