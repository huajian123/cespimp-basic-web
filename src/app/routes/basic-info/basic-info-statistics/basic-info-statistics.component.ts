import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';

@Component({
  selector: 'app-basic-info-basic-info-statistics',
  templateUrl: './basic-info-statistics.component.html',
  styleUrls: ['./basic-info-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoBasicInfoStatisticsComponent implements OnInit {
  ColumnarOption: any;
  CakeOption: any;

  constructor(private http: _HttpClient, private modal: ModalHelper) {

  }
/*饼状图*/
  initCake() {
    this.CakeOption = {
      backgroundColor: 'rgba(255,255,255,1)',
      color: ['#8d7fec', '#5085f2', '#e75fc3', '#f87be2', '#f2719a', '#fca4bb', '#f59a8f', '#fdb301', '#57e7ec'],
      legend: {
        orient: 'vartical',
        x: 'left',
        top: 'center',
        left: '60%',
        bottom: '0%',
        data: ['股份制', '外商投资', '港澳台投资', '私营经济', '集体经济', '个体经济', '国有经济', '联营经济', '其他'],
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 16,
        formatter: function(name) {
          return '' + name;
        },
      },
      series: [{
        type: 'pie',
        clockwise: false, //饼图的扇区是否是顺时针排布
        minAngle: 2, //最小的扇区角度（0 ~ 360）
        radius: ['40%', '70%'],
        center: ['30%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: { //图形样式
          normal: {
            borderColor: '#ffffff',
            borderWidth: 6,
          },
        },
        label: {
          normal: {
            show: false,
            position: 'center',
            formatter: '{text|{b}}\n{c} ({d}%)',
            rich: {
              text: {
                color: '#666',
                fontSize: 14,
                align: 'center',
                verticalAlign: 'middle',
                padding: 8,
              },
              value: {
                color: '#8693F3',
                fontSize: 24,
                align: 'center',
                verticalAlign: 'middle',
              },
            },
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: 24,
            },
          },
        },
        data: [{
          name: '股份制',
          value: 18,
        },
          {
            name: '外商投资',
            value: 16,
          },
          {
            name: '港澳台投资',
            value: 15,
          },
          {
            name: '私营经济',
            value: 14,
          },
          {
            name: '集体经济',
            value: 10,
          },
          {
            name: '个体经济',
            value: 7.9,
          },
          {
            name: '国有经济',
            value: 6.7,
          },
          {
            name: '联营经济',
            value: 6,
          },
          {
            name: '其他',
            value: 4.5,
          },
        ],
      }],
    };
  }
/*柱状图*/
  initColumnar() {
    this.ColumnarOption = {
      title: {
        text: '',
        bottom: 10,
        left: 'center',
        textStyle: {
          fontSize: 14
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        axisTick: {
          show: false,
          color: '#707070'
        },
        axisLabel: {
          textStyle: {
            fontSize: 14,
            color: '#4D4D4D'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#707070'
          }
        },
        data: ['大型企业', '中型企业', '小型企业', '标准化一级', '标准化二级', '标准化三级'],
      }],
      yAxis: {
        type: 'value',
        name: '企业数量',
        nameTextStyle: {
          fontSize: 14,
          color: '#4D4D4D'
        },
        axisLabel: {
          textStyle: {
            fontSize: 12,
            color: '#4D4D4D'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#707070'
          }
        }
      },
      series: [{
        name: '企业数量（个）',
        type: 'bar',
        barWidth: '40%',
        data: [
          {
          name: '大型企业',
          value: '9',
          itemStyle: {
            color: '#1F78B4'
          }
        },
          {
            name: '中型企业',
            value: '35',
            itemStyle: {
              color: '#A6CEE3'
            }
          },
          {
            name: '小型企业',
            value: '20',
            itemStyle: {
              color: '#B2DF8A'
            }
          },
          {
            name: '标准化一级',
            value: '18',
            itemStyle: {
              color: '#33A02C'
            }
          },
          {
            name: '标准化二级',
            value: '15',
            itemStyle: {
              color: '#FB9A99'
            }
          },
          {
            name: '标准化三级',
            value: '5',
            itemStyle: {
              color: '#E31A1C'
            }
          }
        ]
      }]
    };
  }

/*  this.cdr.markForCheck();*/
  ngOnInit() {
    this.initColumnar();
    this.initCake();
  }

}
