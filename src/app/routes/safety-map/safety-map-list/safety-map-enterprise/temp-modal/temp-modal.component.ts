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
  Option: any;
  dateRange = [];
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
  }

  onChartInit(chart: any) {
    this.char = chart;
    setTimeout(() => {
      this.char.resize();
    }, 0);
  }

  connectWs() {
    if (this.ws != null) {
      this.ws.close();
    }
    this.ws = new WebSocket(`ws://${webSocketIp}:8081/websocket/${WebSocketTypeEnum.Temp}`);
    this.ws.onopen = (e) => {
      console.log(e);
      //socket 开启后执行，可以向后端传递信息
      // this.ws.send('sonmething');

    };
    this.ws.onmessage = (e) => {
      //socket 获取后端传递到前端的信息
      // this.ws.send('sonmething');
      if (e.data !== '-连接已建立-') {
        const tempArray = JSON.parse(e.data);
        this.currentDataInfo = tempArray.filter(({id}) => {
          return id === this.id;
        })[0];
        console.log(this.currentDataInfo);
        this.historyLineValue.value = [];
        this.historyLineValue.time = [];
        this.currentDataInfo.historyData.forEach(({ reportTime, sensorValue }) => {
          this.historyLineValue.time.push(new MapPipe().transform(reportTime, 'date:HH:mm:ss'));
          this.historyLineValue.value.push(sensorValue)
        });
        this.initCeShiOption();
        this.char.resize();
        console.log(this.historyLineValue);
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
    await this.safetyMapService.openWebsocket();
    this.connectWs();
  }

  ngOnInit() {
    console.log(this.id);
    this.initCeShiOption();
    this.openWebSocketFn();
  }

  ngOnDestroy(): void {
    this.ws.close();
  }

  ngAfterViewInit(): void {
    // this.initCeShiOption();
    // this.cdr.markForCheck();
  }

}
