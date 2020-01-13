import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SafetyMapService, SafetyMapServiceNs } from '@core/biz-services/safety-map/safety-map.service';
import SensorInfoWebSocketModel = SafetyMapServiceNs.SensorInfoWebSocketModel;
import { webSocketIp } from '@env/environment';
import { MapPipe } from '@shared/directives/pipe/map.pipe';
import WebSocketTypeEnum = SafetyMapServiceNs.WebSocketTypeEnum;
import { subDays, addDays, endOfDay } from 'date-fns';

@Component({
  selector: 'water-level-modal',
  templateUrl: './water-level-modal.component.html',
  styleUrls: ['./water-level-modal.component.scss'],
})
export class WaterLevelModalComponent implements OnInit, OnDestroy {
  @Input() id;
  realTimeChart: any;
  historyChart: any;
  dateRange = [subDays(new Date(), 1), new Date()];
  realTimeOptions: any;
  historyOption: any;
  expandForm: boolean;
  @Input() showModel: boolean;
  @Output() showModelChange = new EventEmitter<boolean>();
  ws: WebSocket;//定义websocket
  currentDataInfo: SensorInfoWebSocketModel;
  dataRange: {
    historyMax: number,
    historyMin: number,
    realTimeMax: number,
    realTimeMin: number
  };
  /*实时数据相关*/
  legendData = ['实时液位'];
  time = 0;
  zoomStart = 0;
  zoomEnd = 100;
  xAxisData = [];
  seriesData = [
    {
      name: '实时液位',
      type: 'line',
      lineStyle: {
        width: 1,
      },
      showSymbol: false,
      smooth: true, //是否平滑显示折现
      data: [],
      markLine: { //最大值和最小值
        data: [
          {
            name: '阈值300',
            yAxis: 20,
            label: {
              show: 'true',
              formatter: '高高报',
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
              formatter: '高报',
            },
            lineStyle: {
              normal: {
                width: 2,
                color: '#FF5D1D',
              },
            },
          },
          {
            name: '阈值300',
            yAxis: 20,
            label: {
              show: 'true',
              formatter: '低报',
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
              formatter: '低低报',
            },
            lineStyle: {
              normal: {
                width: 2,
                color: '#FF5D1D',
              },
            },
          },
        ],
        label: {},
      },
    },
  ];

  /*历史数据相关*/
  historyLegendData = ['历史液位'];
  historyZoomStart = 0;
  historyZoomEnd = 100;
  historyXAxisData = [];
  historySeriesData = [
    {
      name: '历史液位',
      type: 'line',
      lineStyle: {
        width: 1,
      },
      showSymbol: false,
      smooth: true, //是否平滑显示折现
      data: [],
      markLine: { //最大值和最小值
        data: [
          {
            name: '阈值300',
            yAxis: 300,
            label: {
              show: 'true',
              formatter: '高高报',
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
              formatter: '高报',
            },
            lineStyle: {
              normal: {
                width: 2,
                color: '#FF5D1D',
              },
            },
          },
          {
            name: '阈值300',
            yAxis: 300,
            label: {
              show: 'true',
              formatter: '低报',
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
              formatter: '低低报',
            },
            lineStyle: {
              normal: {
                width: 2,
                color: '#FF5D1D',
              },
            },
          },
        ],
      },
    },
  ];

  constructor(private cdr: ChangeDetectorRef, private safetyMapService: SafetyMapService) {
    this.showModel = false;
    this.expandForm = false;
    this.currentDataInfo = {
      sensorName: '',
      sensorNo: '',
      locFactory: '',
      firstAlarmThreshold: null,
      secondAlarmThreshold: null,
      thirdAlarmThreshold: null,
      fourthAlarmThreshold: null,
      status: 0,
      currentValue: 0,
      historyData: [],
    };
    this.dataRange = {
      historyMax: 0,
      historyMin: 0,
      realTimeMax: 0,
      realTimeMin: 0,
    };
  }

  close() {
    this.showModel = false;
    this.showModelChange.emit(false);
  }

  initChartOption() {
    this.realTimeOptions = {
      color: ['#327bfa'],
      title: {
        show: false,
        text: '实时液位',
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
        right: '8%',
        bottom: '15%',
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
        bottom: '7%',
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
        name: 'cm',
        nameTextStyle: {
          color: '#bac7e5',
        },
        max: this.dataRange.realTimeMax,
        min: this.dataRange.realTimeMin,
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
    this.initHistoryOption();
  }

  initHistoryOption() {
    this.historyOption = {
      color: ['#327bfa'],
      title: {
        show: false,
        text: '实时液位',
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
        data: this.historyLegendData,
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
        right: '10%',
        bottom: '15%',
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
        data: this.historyXAxisData,
      },
      dataZoom: [{
        type: 'slider',
        /*类型*/
        xAxisIndex: 0,
        /*对应的轴*/
        bottom: '7%',
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
        name: 'cm',
        nameTextStyle: {
          color: '#bac7e5',
        },
        max: this.dataRange.historyMax,
        min: this.dataRange.historyMin,
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
      series: this.historySeriesData,
    };
  }

  onRealTimeChartInit(chart: any) {
    this.realTimeChart = chart;
  }

  onHistoryChartInit(chart: any) {
    this.historyChart = chart;
  }

  connectWs() {
    if (this.ws != null) {
      this.ws.close();
    }
    this.ws = new WebSocket(`ws://${webSocketIp}:8081/websocket/${WebSocketTypeEnum.WaterLevel}`);
    this.ws.onopen = (e) => {
      //socket 开启后执行，可以向后端传递信息
      // this.ws.send('sonmething');
    };
    this.ws.onmessage = (e) => {
      //socket 获取后端传递到前端的信息
      // this.ws.send('sonmething');
      if (e.data !== '-连接已建立-') {
        const tempArray = JSON.parse(e.data);
        if (tempArray.length === 0) {
          return;
        }
        this.currentDataInfo = tempArray.filter(({ id }) => {
          return id === this.id;
        })[0];
        console.log(this.currentDataInfo);
        if (this.currentDataInfo.currentValue > this.dataRange.realTimeMax) {
          this.dataRange.realTimeMax = Math.ceil(this.currentDataInfo.currentValue * 1.1);
        }
        if (this.currentDataInfo.currentValue < this.dataRange.realTimeMin) {
          this.dataRange.realTimeMin = Math.ceil(this.currentDataInfo.currentValue * 0.9);
        }
        console.log(this.currentDataInfo);

        this.setPercent(this.currentDataInfo.currentValue, {
          first: this.currentDataInfo.firstAlarmThreshold,
          second: this.currentDataInfo.secondAlarmThreshold,
          third: this.currentDataInfo.thirdAlarmThreshold,
          fourth: this.currentDataInfo.fourthAlarmThreshold,
        });
        this.cdr.markForCheck();
      }
    };
    this.ws.onerror = (e) => {
      //socket error信息
    };
    this.ws.onclose = (e) => {
      //socket 关闭后执行
    };
  }

  async openWebSocketFn() {
    this.connectWs();
    await this.safetyMapService.openWebsocket();
  }

  /*实时数据*/
  timef() {
    let str;
    this.time += 3;
    let m = Math.round(this.time / 60);
    str = m < 10 ? '0' + m : m;
    str += ':';
    let s = this.time % 60;
    str += s < 10 ? '0' + s : s;
    return str;
  }

  // 实时数据塞值
  setPercent(p, alarmThresold) {
    console.log(alarmThresold);
    this.realTimeOptions.xAxis.data.push(this.timef());
    this.realTimeOptions.series[0].data.push(p);
    this.realTimeOptions.dataZoom[0].start = this.zoomStart;
    this.realTimeOptions.dataZoom[0].end = this.zoomEnd;
    this.realTimeOptions.yAxis.max = this.dataRange.realTimeMax;
    this.realTimeOptions.yAxis.min = this.dataRange.realTimeMin;
    this.seriesData[0].markLine.data[0].yAxis = alarmThresold.fourth?alarmThresold.fourth:'';
    this.seriesData[0].markLine.data[1].yAxis = alarmThresold.third?alarmThresold.third:'';
    this.seriesData[0].markLine.data[2].yAxis = alarmThresold.second?alarmThresold.second:'';
    this.seriesData[0].markLine.data[3].yAxis =  alarmThresold.first?alarmThresold.first:'';
    this.realTimeChart.setOption(this.realTimeOptions);
  }

  // 历史数据塞值
  historySetPercent(p, t, alarmThresold) {
    this.historyOption.xAxis.data.push(t);
    this.historyOption.series[0].data.push(p);
    this.historyOption.dataZoom[0].start = this.historyZoomStart;
    this.historyOption.dataZoom[0].end = this.historyZoomEnd;
    this.historySeriesData[0].markLine.data[0].yAxis = alarmThresold.fourth;
    this.historySeriesData[0].markLine.data[1].yAxis = alarmThresold.third;
    this.historySeriesData[0].markLine.data[2].yAxis = alarmThresold.second;
    this.historySeriesData[0].markLine.data[3].yAxis = alarmThresold.first;
  }

  // 获取历史数据
  async getHistoryData() {
    const params = {
      id: this.id, beginTime: this.dateRange[0], endTime: this.dateRange[1],
    };
    this.historyOption.xAxis.data = [];
    this.historyOption.series[0].data = [];
    const data = await this.safetyMapService.getSensorHistory(params);
    if(!data.sensorData){
      return;
    }
    data.sensorData.forEach(({ reportTime, sensorValue }) => {
      if (sensorValue > this.dataRange.historyMax) {
        this.dataRange.historyMax = Math.ceil(sensorValue * 1.1);
      }
      if (sensorValue < this.dataRange.historyMin) {
        this.dataRange.historyMin = Math.ceil(sensorValue * 1.1);
      }
      const t = new MapPipe().transform(reportTime, 'date:MM-dd HH:mm:ss');
      this.historySetPercent(sensorValue, t, {
        first: this.currentDataInfo.firstAlarmThreshold,
        second: this.currentDataInfo.secondAlarmThreshold,
        third: this.currentDataInfo.thirdAlarmThreshold,
        fourth: this.currentDataInfo.fourthAlarmThreshold,
      });
    });
    this.historyOption.yAxis.max = this.dataRange.historyMax;
    this.historyOption.yAxis.min = this.dataRange.historyMin;
    this.historyChart.setOption(this.historyOption);
  }

  dataZoomChange(event) {
    this.zoomStart = event.start;
    this.zoomEnd = event.end;
  }

  disabledDate(current: Date) {
    return current.getTime() <= subDays(this.dateRange[0],1).getTime() || endOfDay(current).getTime() >= (addDays(this.dateRange[0], 4).getTime());
  }

  disabledStartDate(current: Date) {
    return current.getTime() < subDays(new Date(),20).getTime();
  }

  // 选择历史数据tab
  selHistoryTab() {
    this.getHistoryData();
  }

  // 历史数据改变第一个搜索条件
  changeStartSearchDate(e) {
    this.dateRange[1] = null;
  }

  // 选择时间
  searchHistroyByTimeRange() {
    this.getHistoryData();
  }

  resetSearch() {
    this.historyOption.xAxis.data = [];
    this.historyOption.series[0].data = [];
    this.dateRange = [subDays(new Date(), 1), new Date()];
    this.getHistoryData();
  }

  async getCurrentValue() {
    this.currentDataInfo = await this.safetyMapService.getSensorCurrentValue(this.id);
    if (this.currentDataInfo.currentValue > this.dataRange.realTimeMax) {
      this.dataRange.realTimeMax = Math.ceil(this.currentDataInfo.currentValue * 1.1);
    }
    if (this.currentDataInfo.currentValue < this.dataRange.realTimeMin) {
      this.dataRange.realTimeMin = Math.ceil(this.currentDataInfo.currentValue * 0.9);
    }
    console.log(this.currentDataInfo);

    this.setPercent(this.currentDataInfo.currentValue, {
      first: this.currentDataInfo.firstAlarmThreshold,
      second: this.currentDataInfo.secondAlarmThreshold,
      third: this.currentDataInfo.thirdAlarmThreshold,
      fourth: this.currentDataInfo.fourthAlarmThreshold,
    });
    this.cdr.markForCheck();
  }

  ngOnInit() {
    this.getCurrentValue();
    setInterval(() => {
      this.getCurrentValue();
    }, 3000);
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
    this.initChartOption();
  }
}
