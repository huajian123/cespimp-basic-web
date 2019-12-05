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
      backgroundColor: '#0A1651',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#57617B',
          },
        },
      },
      legend: {},
      grid: {
        bottom: '10%',
      },
      xAxis: [{
        name: '时间 （单位分钟）',
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#57617B',
          },
        },
        data: ['0', '14:18', '15:28', '16:41', '17:32', '18:11', '19:22', '19:04', '20:01', '21:30'],
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#57617B',
          },
        },

        axisLabel: {
          margin: 10,
          textStyle: {
            color: 'rgba(255,255,255,.6)',
            fontSize: '12',
          },
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.1)',
          },
        },
      }],
      visualMap: [
        {
          show: false,
          pieces: [{
            gt: 0,
            lt: 100,
            color: '#FFFF00',
          }, {
            gt: 100,
            lt: 300,
            color: '#00A1EA',
          }],
          outOfRange: {
            color: '#FF5D1D',
          },
        },
      ],
      series: [{
        name: '压力 mg/m³',
        type: 'line',
        smooth: true,
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
        lineStyle: {
          normal: {
            width: 1,
          },
        },
        itemStyle: {
          normal: {
            color: '#00A1EA',
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
