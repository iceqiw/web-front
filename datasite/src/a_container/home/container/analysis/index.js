import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import P from "prop-types";
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
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
    let myChart = echarts.init(this.hello);
    this.props.actions.actHouseData().then(res => {
      let opt=this.charData(res);
      myChart.setOption(opt);
    });
  }

  charData(datasource) {
    console.log(datasource)
    return {
      title: { text: 'ECharts 入门示例' },
      tooltip: {},
      xAxis: {
        data:datasource.map((a)=>a.name)
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: datasource.map((a)=>a.price_total)
      }]
    }
  }
 

  render() {
    return <div className="son"> <div ref={(c) => { this.hello = c; }} style={{ width: 1400, height: 400 }}></div></div>;
  }
}
