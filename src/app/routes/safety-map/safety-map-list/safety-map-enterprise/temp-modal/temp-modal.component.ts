import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { webSocketIp } from '@env/environment';
import { SafetyMapService, SafetyMapServiceNs } from '@core/biz-services/safety-map/safety-map.service';
import WebSocketTypeEnum = SafetyMapServiceNs.WebSocketTypeEnum;
import SensorInfoWebSocketModel = SafetyMapServiceNs.SensorInfoWebSocketModel;
import { MapPipe } from '@shared/directives/pipe/map.pipe';

@Component({
  selector: 'temp-modal',
  templateUrl: './temp-modal.component.html',
  styleUrls: ['./temp-modal.component.scss'],
})
export class TempModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() id;
  char: any;
  realTimeChart: any;
  Option: any;
  dateRange = [];
  realTimeOptions: any;
  historyOption: any;
  value: any;
  kd: any;
  /*  data: any;*/
  borderColor: any;
  mercuryColor: any;
  @Input() showModel: boolean;
  @Output() showModelChange = new EventEmitter<boolean>();
  ws: WebSocket;//定义websocket
  currentDataInfo: SensorInfoWebSocketModel;
  historyLineValue: {
    time: string[],
    value: number[]
  };

  /*实时表格*/
  legendData = ['实时温度'];
  time = 0;
  zoomStart = 0;
  zoomEnd = 100;
  xAxisData = [];
  seriesData = [
    {
      name: '实时温度',
      type: 'line',
      lineStyle: {
        width: 1,
      },
      showSymbol: false,
      smooth: true, //是否平滑显示折现
      data: [],
    },
  ];

  constructor(private cdr: ChangeDetectorRef, private safetyMapService: SafetyMapService) {
    this.showModel = false;
    this.value = 40.0;
    this.borderColor = '#fd4d49';
    this.mercuryColor = '#fd4d49';
    this.kd = [];
    this.historyLineValue = {
      time: [],
      value: [],
    };

    this.currentDataInfo = {
      sensorName: '',
      sensorNo: '',
      locFactory: '',
      firstAlarmThreshold: 0,
      secondAlarmThreshold: 0,
      status: 0,
      currentValue: 0,
      historyData: [],
    };
  }

  close() {
    this.showModel = false;
    this.showModelChange.emit(false);
  }

// 因为柱状初始化为0，温度存在负值，所以，原本的0-100，改为0-130，0-30用于表示负值
  getData(value) {
    return [value + 30];
  }

  data = this.getData(40);

  initCeShiOption() {
    this.Option = {
      title: {
        text: '温度计',
        show: false,
      },
      yAxis: [{
        show: false,
        min: 0,
        max: 130,
      }, {
        show: false,
        data: [],
        min: 0,
        max: 130,
      }],
      xAxis: [{
        show: false,
        data: [],
      }, {
        show: false,
        data: [],
      }, {
        show: false,
        data: [],
      }, {
        show: false,
        min: -110,
        max: 100,

      }],
      series: [{
        name: '条',
        type: 'bar',
        // 对应上面XAxis的第一个对象配置
        xAxisIndex: 0,
        data: this.data,
        barWidth: 18,
        itemStyle: {
          normal: {
            color: this.mercuryColor,
            barBorderRadius: 0,
          },
        },
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: () => {
              // 因为柱状初始化为0，温度存在负值，所以，原本的0-100，改为0-130，0-30用于表示负值
              return '';
            },
            textStyle: {
              color: '#ccc',
              fontSize: '10',
            },
          },
        },
        z: 2,
      }, {
        name: '白框',
        type: 'bar',
        xAxisIndex: 1,
        barGap: '-100%',
        data: [129],
        barWidth: 28,
        itemStyle: {
          normal: {
            color: '#ffffff',
            barBorderRadius: 50,
          },
        },
        z: 1,
      }, {
        name: '外框',
        type: 'bar',
        xAxisIndex: 2,
        barGap: '-100%',
        data: [130],
        barWidth: 38,
        itemStyle: {
          normal: {
            color: this.borderColor,
            barBorderRadius: 50,
          },
        },
        z: 0,
      }, {
        name: '圆',
        type: 'scatter',
        hoverAnimation: false,
        data: [0],
        xAxisIndex: 0,
        symbolSize: 48,
        itemStyle: {
          normal: {
            color: this.mercuryColor,
            opacity: 1,
          },
        },
        z: 2,
      }, {
        name: '白圆',
        type: 'scatter',
        hoverAnimation: false,
        data: [0],
        xAxisIndex: 1,
        symbolSize: 60,
        itemStyle: {
          normal: {
            color: '#ffffff',
            opacity: 1,
          },
        },
        z: 1,
      }, {
        name: '外圆',
        type: 'scatter',
        hoverAnimation: false,
        data: [0],
        xAxisIndex: 2,
        symbolSize: 70,
        itemStyle: {
          normal: {
            color: this.borderColor,
            opacity: 1,
          },
        },
        z: 0,
      }, {
        name: '刻度',
        type: 'bar',
        yAxisIndex: 1,
        xAxisIndex: 3,
        label: {
          normal: {
            show: true,
            position: 'right',
            distance: 5,
            color: '#525252',
            fontSize: 10,
            formatter: function(params) {
              // 因为柱状初始化为0，温度存在负值，所以，原本的0-100，改为0-130，0-30用于表示负值
              if (params.dataIndex > 100 || params.dataIndex < 30) {
                return '';
              } else {
                if (params.dataIndex % 5 === 0) {
                  return params.dataIndex - 30;
                } else {
                  return '';
                }
              }
            },
          },
        },
        barGap: '-100%',
        data: this.kd,
        barWidth: 1,
        itemStyle: {
          normal: {
            color: this.borderColor,
            barBorderRadius: 10,
          },
        },
        z: 0,
      }],

    };

    this.historyOption = {
      backgroundColor: '#FFF',
      grid: {
        top: '9%',
        bottom: '19%',
        left: '6%',
        right: '4%',
      },
      tooltip: {
        trigger: 'axis',
        label: {
          show: true,
        },
      },
      xAxis: {
        boundaryGap: true, //默认，坐标轴留白策略
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
          alignWithLabel: true,
        },
        data: this.historyLineValue.time,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(33,148,246,0.2)',
          },
        },
        axisTick: {
          show: false,
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: 'rgb(245,250,254)',
          },
        },
      },
      series: [{
        type: 'line',
        symbol: 'circle',
        markLine: { //最大值和最小值
          data: [
            {
              name: '阈值300',
              yAxis: 300,
              label: {
                show: 'true',
              },
              lineStyle: {
                normal: {
                  width: 2,
                  color: '#FF5D1D',
                },
              },

            },
            {
              name: '阈值100',
              yAxis: 100,
              label: {
                show: 'true',
              },
              lineStyle: {
                normal: {
                  width: 2,
                  color: '#FF5D1D',
                },
              },
            }],
        },
        symbolSize: 7,
        lineStyle: {
          color: 'rgb(33,148,246)',
          shadowBlur: 12,
          shadowColor: 'rgb(33,148,246,0.9)',
          shadowOffsetX: 1,
          shadowOffsetY: 1,
        },
        itemStyle: {
          color: 'rgb(33,148,246)',
          borderWidth: 1,
          borderColor: '#FFF',
        },
        label: {
          show: false,
          distance: 1,
          emphasis: {
            show: true,
            offset: [25, -2],
            //borderWidth:1,
            // borderColor:'rgb(33,148,246)',
            //formatter:'{bg|{b}\n数据量:{c}}',
            backgroundColor: {
              image: '../../../../../../assets/66.png',
            },
            color: '#FFF',
            padding: [8, 20, 8, 6],
            //width:60,
            height: 36,
            formatter: function(params) {
              let name = params.name;
              let value = params.data;
              let str = name + '\n数据量：' + value;
              return str;
            },
            rich: {
              bg: {
                backgroundColor: {
                  image: '../../../../../../assets/66.png',
                },
                width: 78,
                //height:42,
                color: '#FFF',
                padding: [20, 0, 20, 10],
              },
              br: {
                width: '100%',
                height: '100%',
              },

            },
          },
        },
        data: this.historyLineValue.value,
      }],
    };

    this.realTimeOptions = {
      color: ['#327bfa'],
      title: {
        show: false,
        text: '实时温度',
        x: '50%',
        y: '5%',
        textAlign: 'center',
        textStyle: {
          color: '#bac7e5',
          fontSize: '30',
          fontWeight: 'normal',
        },

      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#282d3b',
        textStyle: {
          color: '#bac7e5',
        },
      },
      legend: {
        bottom: '0',
        data: this.legendData,
        textStyle: {
          color: '#bac7e5',
        },
        icon: 'rect',
        itemWidth: 12,
        itemHeight: 12,
      },
      grid: {
        top: '10%',
        left: '5%',
        right: '5%',
        bottom: '35%',
        containLabel: true,
      },
      toolbox: {
        show: false,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisTick: {
          show: true,
        },
        axisLine: {
          lineStyle: {
            color: '#7c88a7',
          },
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: '#bac7e5',
        },
        data: this.xAxisData,
      },
      dataZoom: [{
        type: 'slider',
        /*类型*/
        xAxisIndex: 0,
        /*对应的轴*/
        bottom: '23%',
        /*位置，定位*/
        start: 0,
        /*开始*/
        end: 100,
        /*结束*/
        handleIcon: 'M0,0 v9.7h5 v-9.7h-5 Z',
        handleStyle: {
          /*手柄的样式*/
          color: '#00b0ff',
          borderColor: '#00b0ff',
        },
        backgroundColor: '#233239',
        borderColor: '#233239',
        /*背景 */
        dataBackground: {
          /*数据背景*/
          lineStyle: {
            color: '#000000',
          },
          areaStyle: {
            color: '#ddd',
          },
        },
        fillerColor: 'rgba(31,178,251,0.2)',
        /*被start和end遮住的背景*/
        labelFormatter: function(value, params) {
          /*拖动时两端的文字提示*/
          var str = '';
          if (params.length > 5) {
            str = params.substring(0, 5) + '…';
          } else {
            str = params;
          }
          return str;
        },
        textStyle: {
          color: '#bac7e5',
        },
      }],
      yAxis: {
        type: 'value',
        name: '℃',
        nameTextStyle: {
          color: '#bac7e5',
        },
        max: 120,
        axisTick: {
          show: true,
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#7c88a7',
          },
        },
        axisLabel: {
          color: '#bac7e5',
        },
      },
      backgroundColor: '#233239',
      series: this.seriesData,
    };
  }

  onRealTimeChartInit(chart: any) {
    this.realTimeChart = chart;
    // chart.on('dataZoom', (event) => {
    //   this.realTimeChart.resize();
    // });
    // this.char = chart;
    // setTimeout(() => {
    //   this.char.resize();
    // }, 0);
  }


  onChartInit(chart: any) {
    chart.on('dataZoom', (event) => {
    });
    // this.char = chart;
    // setTimeout(() => {
    //   this.char.resize();
    // }, 0);
  }

  connectWs() {
    if (this.ws != null) {
      this.ws.close();
    }
    this.ws = new WebSocket(`ws://${webSocketIp}:8081/websocket/${WebSocketTypeEnum.Temp}`);
    this.ws.onopen = (e) => {
      //socket 开启后执行，可以向后端传递信息
      // this.ws.send('sonmething');

    };
    this.ws.onmessage = (e) => {
      //socket 获取后端传递到前端的信息
      // this.ws.send('sonmething');
      if (e.data !== '-连接已建立-') {
        const tempArray = JSON.parse(e.data);
        this.currentDataInfo = tempArray.filter(({ id }) => {
          return id === this.id;
        })[0];
        this.historyLineValue.value = [];
        this.historyLineValue.time = [];
        this.currentDataInfo.historyData.forEach(({ reportTime, sensorValue }) => {
          this.historyLineValue.time.push(new MapPipe().transform(reportTime, 'date:HH:mm:ss'));
          this.historyLineValue.value.push(sensorValue);
        });
        console.log(this.currentDataInfo);
        this.setPercent(this.currentDataInfo.currentValue);
        this.cdr.markForCheck();
      }
    };
    this.ws.onerror = (e) => {
      //socket error信息
      console.log(e);

    };
    this.ws.onclose = (e) => {
      //socket 关闭后执行
      console.log(e);
    };
  }

  async openWebSocketFn() {
    this.connectWs();
    await this.safetyMapService.openWebsocket();

  }

  /*实时数据*/
  timef() {
    let str;
    this.time+=3;
    let m = Math.round(this.time / 60);
    str = m < 10 ? '0' + m : m;
    str += ':';
    let s = this.time % 60;
    str += s < 10 ? '0' + s : s;
    return str;
  }

  random() {
    let value = (Math.random() * 100).toFixed(2);
    return +value > 30 && +value < 50 ? value : this.random();
  }

  setPercent(p) {
    this.realTimeOptions.xAxis.data.push(this.timef());
    this.realTimeOptions.series[0].data.push(p);
    this.realTimeOptions.dataZoom[0].start = this.zoomStart;
    this.realTimeOptions.dataZoom[0].end = this.zoomEnd;
    this.realTimeChart.setOption(this.realTimeOptions);
    this.cdr.markForCheck();
  }

  dataZoomChange(event) {
    this.zoomStart = event.start;
    this.zoomEnd = event.end;
  }

  ngOnInit() {
    this.initCeShiOption();
    this.openWebSocketFn();
  }

  ngOnDestroy(): void {
    this.ws.close();
  }

  ngAfterViewInit(): void {
   /* setInterval(() => {
      let value = Math.random() * 100;
      this.setPercent(+value);
    //  this.realTimeChart.resize();
    }, 1000);*/
  }
}
