#### echarts

```js
mounted () {
    const chartDom = document.querySelector('.chart-content')
    const myChart = echarts.init(chartDom)
    this.option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        type: 'scroll', // 设置图例类型为滚动
        pageButtonItemGap: 5, // 设置翻页按钮之间的间距
        pageButtonGap: 10, // 设置翻页按钮与图例项之间的间距
        itemWidth: 20, // 设置图例宽度
        itemHeight: 10, // 设置图例高度
        data: [
          'Email',
          'Union Ads',
          'Video Ads',
          'Direct',
          'Search Engine',
          'Email1',
          'Union Ads1',
          'Video Ads1',
          'Direct1',
          'Search Engine1'
        ],
        center: 'middle',
        top: 'bottom'
      },
      grid: {
        top: '10',
        left: '0', // 减小左边距
        right: '10', // 减小右边距
        center: 'middle',
        bottom: '8%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLine: {
          // y轴线
          lineStyle: {
            color: 'transparent' // 修改为红色
          }
        },
        axisLabel: {
          // y轴标签
          color: '#9aa8c0', // 修改为红色
          margin: 20 // 增大标签与轴线之间的距离v
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          // y轴线
          lineStyle: {
            color: 'transparent' // 修改为红色
          }
        },
        axisLabel: {
          // y轴标签
          color: '#9aa8c0', // 修改为红色
          margin: 20 // 增大标签与轴线之间的距离
        },
        splitLine: {
          // 分割线
          lineStyle: {
            color: '#edf2fd' // 修改为红色
          }
        }
      },
      series: [
        {
          name: 'Email',
          type: 'line',
          data: [{ value: 0 }, 50, 0, 30, 0, 40, 0],
          lineStyle: {
            color: '#fd728f', // 设置线条颜色为红色
            width: 4 // 设置线条粗细为5
          },
          symbolSize: 10, // 小圆点的大小
          symbol: 'circle', // 将小圆点改成实心 不写symbol默认空心
          itemStyle: {
              color: '#fd728f'
          }
        },
        {
          name: 'Union Ads',
          type: 'line',
          data: [10, 0, 20, 0, 35, 0, 44],
          lineStyle: {
            color: '#ff9050', // 设置线条颜色为红色
            width: 4 // 设置线条粗细为5
          },
          symbolSize: 10, // 小圆点的大小
          symbol: 'circle', // 将小圆点改成实心 不写symbol默认空心
          itemStyle: {
            // 设置转折点样式
            color: '#ff9050' // 设置转折点颜色为红色
          }
        },
        {
          name: 'Video Ads',
          type: 'line',
          data: [0, 25, 0, 65, 0, 45, 0],
          lineStyle: {
            color: '#63edb6', // 设置线条颜色为红色
            width: 4 // 设置线条粗细为5
          },
          symbolSize: 10, // 小圆点的大小
          symbol: 'circle', // 将小圆点改成实心 不写symbol默认空心
          itemStyle: {
            // 设置转折点样式
            color: '#63edb6' // 设置转折点颜色为红色
          }
        },
        {
          name: 'Direct',
          type: 'line',
          data: [60, 0, 10, 0, 30, 0, 60],
          lineStyle: {
            color: '#47618f', // 设置线条颜色为红色
            width: 4 // 设置线条粗细为5
          },
          symbolSize: 10, // 小圆点的大小
          symbol: 'circle', // 将小圆点改成实心 不写symbol默认空心
          itemStyle: {
            // 设置转折点样式
            color: '#47618f' // 设置转折点颜色为红色
          }
        },
        {
          name: 'Search Engine',
          type: 'line',
          data: [0, 50, 0, 36, 0, 45, 0],
          lineStyle: {
            color: '#ffd4f0', // 设置线条颜色为红色
            width: 4 // 设置线条粗细为5
          },
          symbolSize: 10, // 小圆点的大小
          symbol: 'circle', // 将小圆点改成实心 不写symbol默认空心
          itemStyle: {
            // 设置转折点样式
            color: '#ffd4f0' // 设置转折点颜色为红色
          }
        }
        // {
        //   name: 'Email1',
        //   type: 'line',
        //   data: [0, 50, 0, 30, 0, 40, 0],
        //   lineStyle: {
        //     color: '#fd728f', // 设置线条颜色为红色
        //     width: 4 // 设置线条粗细为5
        //   },
        //   itemStyle: {
        //     // 设置转折点样式
        //     color: '#fd728f', // 设置转折点颜色为红色
        //     borderWidth: 0 // 设置转折点边框宽度为0，即实心圆
        //   }
        // },
        // {
        //   name: 'Union Ads1',
        //   type: 'line',
        //   data: [10, 0, 20, 0, 35, 0, 44],
        //   lineStyle: {
        //     color: '#ff9050', // 设置线条颜色为红色
        //     width: 4 // 设置线条粗细为5
        //   },
        //   itemStyle: {
        //     // 设置转折点样式
        //     color: '#ff9050', // 设置转折点颜色为红色
        //     borderWidth: 0 // 设置转折点边框宽度为0，即实心圆
        //   }
        // },
        // {
        //   name: 'Video Ads1',
        //   type: 'line',
        //   data: [0, 25, 0, 65, 0, 45, 0],
        //   lineStyle: {
        //     color: '#63edb6', // 设置线条颜色为红色
        //     width: 4 // 设置线条粗细为5
        //   },
        //   itemStyle: {
        //     // 设置转折点样式
        //     color: '#63edb6', // 设置转折点颜色为红色
        //     borderWidth: 0 // 设置转折点边框宽度为0，即实心圆
        //   }
        // },
        // {
        //   name: 'Direct1',
        //   type: 'line',
        //   data: [60, 0, 10, 0, 30, 0, 60],
        //   lineStyle: {
        //     color: '#47618f', // 设置线条颜色为红色
        //     width: 4 // 设置线条粗细为5
        //   },
        //   itemStyle: {
        //     // 设置转折点样式
        //     color: '#47618f', // 设置转折点颜色为红色
        //     borderWidth: 0 // 设置转折点边框宽度为0，即实心圆
        //   }
        // },
        // {
        //   name: 'Search Engine1',
        //   type: 'line',
        //   data: [0, 50, 0, 36, 0, 45, 0],
        //   lineStyle: {
        //     color: '#ffd4f0', // 设置线条颜色为红色
        //     width: 4 // 设置线条粗细为5
        //   },
        //   itemStyle: {
        //     // 设置转折点样式
        //     color: '#ffd4f0', // 设置转折点颜色为红色
        //     borderWidth: 0 // 设置转折点边框宽度为0，即实心圆
        //   }
        // }
      ]
    }
    this.echartsObj = myChart.setOption(this.option)
  },
```

