export const charDataA = (datasource = {}) => {
  console.log(datasource)
  const option = {
    title: { text: '房价' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      ype: 'category',
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
        show: false,
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
      data: datasource.map((a) => a.price_total)
    }, {
      name: '面积',
      type: 'line',
      yAxisIndex: 1,
      smooth: true,//折线图是趋缓的
      data: datasource.map((a) => a.acreage)
    }, {
      name: '单价',
      type: 'line',
      yAxisIndex: 2,
      smooth: true,//折线图是趋缓的
      data: datasource.map((a) => a.price)
    }, {
      name: '租金',
      type: 'line',
      yAxisIndex: 3,
      smooth: true,//折线图是趋缓的
      data: datasource.map((a) => a.rent)
    }]
  };
  return option
};
