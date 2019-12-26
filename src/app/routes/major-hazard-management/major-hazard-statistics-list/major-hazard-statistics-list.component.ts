import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  MajorHazardStatisticsInfoService,
  MajorHazardStatisticsInfoServiceNs,
} from '@core/biz-services/major-hazard-management/major-hazard-statistics.service';
import EnterpriseHazardStatisticsModel = MajorHazardStatisticsInfoServiceNs.EnterpHazardStatisticsModel;

@Component({
  selector: 'app-major-hazard-management-major-hazard-statistics-list',
  templateUrl: './major-hazard-statistics-list.component.html',
  styleUrls: ['./major-hazard-statistics-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MajorHazardManagementMajorHazardStatisticsListComponent implements OnInit {
  PieOption: any;
  RingOption: any;
  dataInfo: EnterpriseHazardStatisticsModel;

  constructor(private dataService: MajorHazardStatisticsInfoService,private cdr: ChangeDetectorRef) {

  }

  async getDetail() {
    this.dataInfo = await this.dataService.getEnterpriseInfoDetail();
    console.log(this.dataInfo);
    this.cdr.markForCheck();
  }

  initPie() {
    this.PieOption = {
      title: {
        text: '重大危险源等级',
        x: 'center',
      },
      color: ['#ffdb5c', '#fb7293', '#e7bcf3', '#8378ea'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      toolbox: {},
      calculable: true,
      series: [
        {
          name: '重大危险源等级占比统计',
          type: 'pie',
          radius: [20, 150],
          roseType: 'area',
          data: [
            { value: 30, name: '一级' },
            { value: 15, name: '二级' },
            { value: 45, name: '三级' },
            { value: 10, name: '四级' },
          ],
        },
      ],
    };
  };

  initRing() {
    this.RingOption = {
      backgroundColor: '#fff',
      title: {
        text: '危险源性质',
        x: 'center',
        y: 'center',
        textStyle: {
          fontWeight: 'normal',
          fontSize: 14,
        },
      },
      tooltip: {
        show: true,
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'horizontal',
        bottom: '0%',
        data: ['易燃', '有毒', '易燃兼有毒'],
      },
      series: [{
        type: 'pie',
        selectedMode: 'single',
        radius: ['25%', '58%'],
        color: ['#86D560', '#AF89D6', '#59ADF3'],

        label: {
          normal: {
            position: 'inner',
            formatter: '{d}%',

            textStyle: {
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 14,
            },
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: [{
          value: 39,
          name: '易燃',
        }, {
          value: 59,
          name: '有毒',
        }, {
          value: 105,
          name: '易燃兼有毒',
        }],
      }, {
        type: 'pie',
        radius: ['60%', '85%'],
        itemStyle: {
          normal: {
            color: '#F2F2F2',
          },
          emphasis: {
            color: '#ADADAD',
          },
        },
        label: {
          normal: {
            position: 'inner',
            formatter: '{c}家',
            textStyle: {
              color: '#777777',
              fontWeight: 'bold',
              fontSize: 14,
            },
          },
        },
        data: [{
          value: 39,
          name: '易燃',
        }, {
          value: 59,
          name: '有毒',
        }, {
          value: 105,
          name: '易燃兼有毒',
        }],
      }],
    };
  }

  ngOnInit() {
    this.getDetail();
    this.initPie();
    this.initRing();
  }

  _onReuseInit() {
    this.ngOnInit();
  }

}
