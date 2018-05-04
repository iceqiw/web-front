export const charDataB = (datasource) => {
  console.log(datasource)
  const option = {
    title: { text: '房价' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      ype: 'category',
      position: 'bottom',
      boundaryGap: true,
      axisLine: {    // 轴线
        show: true,
        lineStyle: {
          type: 'solid',
          width: 1
        }
      },
      data: datasource.map((a) => a.name)

    },
    calculable: true,
    legend: {
      data: ['总价', '面积', '单价', '租金']
    },
    yAxis: [
      {
        type: 'value',
        name: '总价',
        axisLabel: {
          formatter: '{value} 万'
        }
      },
      {
        type: 'value',
        name: '面积',
        axisLabel: {
          formatter: '{value} 平米'
        }
      },
      {
        type: 'value',
        name: '单价',
        axisLabel: {
          formatter: '{value} 平米/元'
        }
      },
      {
        type: 'value',
        name: '租金',
        show: false,
        axisLabel: {
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
      data: datasource.map((a) => a.price_total)
    }, {
      name: '面积',
      type: 'bar',
      barWidth: '30%',
      itemStyle: {
        normal: {
          color: 'rgb(155, 170, 131)'
        }
      },
      data: datasource.map((a) => a.acreage)
    }, {
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
      data: datasource.map((a) => a.price)
    }, {
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
      data: datasource.map((a) => a.rent)
    }]
  };
  return option
};
