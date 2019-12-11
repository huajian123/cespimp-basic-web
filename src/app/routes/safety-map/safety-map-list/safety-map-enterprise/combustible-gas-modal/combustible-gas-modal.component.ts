import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'combustible-gas-modal',
  templateUrl: './combustible-gas-modal.component.html',
  styleUrls: ['./combustible-gas-modal.component.scss'],
  host: {
    '[class.d-block]': 'true'
  }
})
export class CombustibleGasModalComponent implements OnInit {
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

  constructor(private cdr: ChangeDetectorRef) {
    this.showModel = false;
    this.value = 40.0;
    this.borderColor = '#fd4d49';
    this.mercuryColor = '#fd4d49';
    this.kd = [];

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
        data: ['0', '14:18', '15:28', '16:41', '17:32', '18:11', '19:22', '19:04', '20:01', '21:30'],
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
        data: [150, 152, 252, 252, 152, 358, 252, 355, 344, 352],
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

  ngAfterViewInit(): void {
    this.initCeShiOption();
    this.cdr.markForCheck();
  }

}
