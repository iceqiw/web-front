import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import P from "prop-types";

import { Row, Col } from 'antd';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
// ==================
// 组件
// ==================
import { actHouseData } from "../../../../a_action/analysis-action";
import { charDataA } from "./chartA";
import { charDataB } from "./chartB";

@connect(
  state => ({ houseinfo: state.analysis.houseinfo }),
  dispatch => ({
    actions: bindActionCreators({ actHouseData }, dispatch)
  })
)
export default class Analysis extends React.Component {

  static propTypes = {
    location: P.any,
    history: P.any,
    actions: P.any,
    houseinfo: P.array
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.showChart()
  }

  showChart() {
    const myChartA = echarts.init(this.Acharts);
    this.props.actions.actHouseData().then(res => {
      const opt = charDataA(res);
      myChartA.setOption(opt);
    });

    // const myChartB = echarts.init(this.Bcharts);
    // this.props.actions.actHouseData().then(res => {
    //   const opt=charDataB(res);
    //   myChartB.setOption(opt);
    // });
  }


  render() {
    return <div>
      <Row type="flex" align="middle" justify="center">
        <Col xs={24} md={24}>
          <div ref={(c) => { this.Acharts = c; }} style={{ width: '100%', height: '600px' }}></div>
        </Col>
      </Row>
      <Row type="flex" align="middle" justify="center">
        <Col xs={24} md={24}>
          <div ref={(c) => { this.Bcharts = c; }} style={{ width: '100%', height: '600px' }}></div>
        </Col>
      </Row>
    </div>;
  }
}
