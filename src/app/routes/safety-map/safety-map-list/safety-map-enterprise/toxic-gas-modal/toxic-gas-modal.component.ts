import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { SafetyMapService, SafetyMapServiceNs } from '@core/biz-services/safety-map/safety-map.service';
import SensorInfoWebSocketModel = SafetyMapServiceNs.SensorInfoWebSocketModel;
import { webSocketIp } from '@env/environment';
import { MapPipe } from '@shared/directives/pipe/map.pipe';
import WebSocketTypeEnum = SafetyMapServiceNs.WebSocketTypeEnum;

@Component({
  selector: 'toxic-gas-modal',
  templateUrl: './toxic-gas-modal.component.html',
  styleUrls: ['./toxic-gas-modal.component.scss'],
  host: {
    '[class.d-block]': 'true',
  },
})
export class ToxicGasModalComponent implements OnInit, OnDestroy {

  char: any;
  Option: any;
  historyOption: any;
  value: any;
  kd: any;
  /*  data: any;*/
  borderColor: any;
  mercuryColor: any;
  @Input() showModel: boolean;
  @Output() showModelChange = new EventEmitter<boolean>();
  dateRange = [];
  ws: WebSocket;//定义websocket
  currentDataInfo: SensorInfoWebSocketModel;
  historyLineValue: {
    time: string[],
    value: number[]
  };
  constructor(private cdr: ChangeDetectorRef,private safetyMapService: SafetyMapService) {
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
      backgroundColor: '#ffffff',
      color: ['#37A2DA', '#32C5E9', '#67E0E3'],
      series: [{
        name: '业务指标',
        type: 'gauge',
        detail: {
          formatter: '{value}%',
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 30,
            shadowBlur: 0,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#37a2da'],
              [1, '#fd666d'],
            ],
          },
        },
        data: [{
          value: 36,
          name: '承压率',
        }],

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
    }, 400);
  }

  ngOnInit() {
    this.initCeShiOption();
  }

  connectWs() {
    if (this.ws != null) {
      this.ws.close();
    }
    this.ws = new WebSocket(`ws://${webSocketIp}:8081/websocket/${WebSocketTypeEnum.PoisonGas}`);
    this.ws.onopen = (e) => {
      console.log(e);
      //socket 开启后执行，可以向后端传递信息
      // this.ws.send('sonmething');

    };
    this.ws.onmessage = (e) => {
      //socket 获取后端传递到前端的信息
      // this.ws.send('sonmething');
      if (e.data !== '-连接已建立-') {
        this.currentDataInfo = JSON.parse(e.data);
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

  ngAfterViewInit(): void {
    this.initCeShiOption();
    this.openWebSocketFn();
    this.cdr.markForCheck();
  }
  ngOnDestroy(): void {
    this.ws.close();
  }
}
