import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'temp-modal',
  templateUrl: './temp-modal.component.html',
  styleUrls: ['./temp-modal.component.scss'],
})
export class TempModalComponent implements OnInit, AfterViewInit {
  char: any;
  Option: any;
  value: any;
  kd: any;
  /*  data: any;*/
  borderColor: any;
  mercuryColor: any;
  @Input() showModel: boolean;
  @Output() showModelChange = new EventEmitter<boolean>();

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
            formatter: function(param) {
              // 因为柱状初始化为0，温度存在负值，所以，原本的0-100，改为0-130，0-30用于表示负值
              return param.value - 30 + '°C';
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
    this.cdr.markForCheck()
  }

}
