import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import P from "prop-types";

import { Row, Col } from 'antd';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
// ==================
// 组件
// ==================
import { actHouseData} from "../../../../a_action/analysis-action";


@connect(
  state => ({ houseinfo: state.analysis.houseinfo}),
  dispatch => ({
    actions: bindActionCreators({actHouseData}, dispatch)
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

  showChart(){
    let myChart = echarts.init(this.charts);
    this.props.actions.actHouseData().then(res => {
      let opt=this.charData(res);
      myChart.setOption(opt);
    });
  }

  charData(datasource) {
    console.log(datasource)
                      
    let option={
      title: { text: '房价' },
      tooltip: { trigger: 'axis'},
      xAxis: {
        ype : 'category',
        position: 'bottom',
        boundaryGap: true,
        axisLine : {    // 轴线
            show: true,
            lineStyle: {
                type: 'solid',
                width: 1
            }
        },
        data:datasource.map((a)=>a.name)

      },
      calculable : true,
      legend: {
        data: ['总价','面积','单价','租金']
      },
      yAxis: [
        {
          type : 'value',
          name : '总价',
          axisLabel : {
              formatter: '{value} 万'
          }
        },
        {
          type : 'value',
          name : '面积',
          axisLabel : {
              formatter: '{value} 平米'
          }
        },
        {
          type : 'value',
          name : '单价',
          axisLabel : {
              formatter: '{value} 平米/元'
          }
        },
        {
          type : 'value',
          name : '租金',
          show: false,
          axisLabel : {
              formatter: '{value} 元'
          }
        }], 
        series: [{
          name: '总价',
          type: 'bar',
          yAxisIndex: 0,
          itemStyle: {
            normal: {
                color: 'rgb(255, 70, 131)'
              }
          },
          data: datasource.map((a)=>a.price_total)
        },{
          name: '面积',
          type: 'bar',
          barWidth: '30%',
          itemStyle: {
            normal: {
                color: 'rgb(155, 170, 131)'
              }
          },
          data: datasource.map((a)=>a.acreage)
        },{
          name: '单价',
          type: 'line',
          yAxisIndex: 2,
          lineStyle: {
            normal: {
                width: 2,  //连线粗细
                color: "#278BDD"  //连线颜色
              }
          },
          smooth: true,//折线图是趋缓的
          data: datasource.map((a)=>a.price)
        },{
          name: '租金',
          type: 'line',
          yAxisIndex: 3,
          lineStyle: {
            normal: {
                width: 3,  //连线粗细
                color: "#A52A2A"  //连线颜色
              }
          },
          smooth: true,//折线图是趋缓的
          data: datasource.map((a)=>a.rent)
      }]
    };
    return option
  }

  render() {
    return <div> 
       <Row type="flex" align="middle" justify="center">
            <Col xs={24} md={24}>
            <div ref={(c) => { this.charts = c; }} style={{ width: '100%' , height: '600px' }}></div>
            </Col>
        </Row>
    </div>;
  }
}
