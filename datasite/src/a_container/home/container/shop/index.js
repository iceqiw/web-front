import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import P from "prop-types";
import { Button, message, Card, Row, Col, Input, Pagination } from 'antd';

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
    searchKey: state.app.searchKey
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
    searchKey: P.string
  };

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.actions.actIndex({ pn: 1 })
  }

  onChange = (pageNumber) => {
    if (this.props.searchKey) {
      this.props.actions.actSearch({ pn: pageNumber, key: this.props.searchKey })
    } else {
      this.props.actions.actIndex({ pn: pageNumber })
    }
  }

  onSearch = (key) => {
    console.log('onSearch: ', key);
    this.props.actions.actSearch({ pn: 1, key: key })
    this.setState({
      current: 1
    })
  }

  render() {
    return (
      <div>
        <Row type="flex" align="middle" justify="center">
          <Col xs={24} md={12}>
            <Search placeholder="input search text" enterButton="搜索" size="large" onSearch={this.onSearch.bind(this)} />
          </Col>
        </Row>
        <div style={{ background: '#fff', margin: 24 }}>
          <Row type="flex" align="middle" justify="start" >
            {this.props.content.map((item, index) => (
              <Col key={index} xs={24} md={6}>
                <div style={{ background: '#fff', margin: 12 }} >
                  <Card
                    hoverable
                    cover={<img alt="example" className={styles.img} src={item.imgUrl} />}
                  >
                    <a href={item.url} >
                      <Meta
                        title={item.title}
                        description={item.price}
                      />
                    </a>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
          <Row type="flex" align="middle" justify="center">
            <Pagination simple current={this.props.pageNum} total={this.props.totalSize} onChange={this.onChange} pageSize={this.props.pageSize} />
          </Row>
        </div>
      </div>
    );
  }
}
