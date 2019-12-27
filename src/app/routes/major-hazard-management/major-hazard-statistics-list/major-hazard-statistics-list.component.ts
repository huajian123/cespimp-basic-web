import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  MajorHazardStatisticsInfoService,
  MajorHazardStatisticsInfoServiceNs,
} from '@core/biz-services/major-hazard-management/major-hazard-statistics.service';
import EnterpriseHazardStatisticsModel = MajorHazardStatisticsInfoServiceNs.EnterpHazardStatisticsModel;
import EnterpHazardModel = MajorHazardStatisticsInfoServiceNs.EnterpHazardModel;
import EnterpGasModel = MajorHazardStatisticsInfoServiceNs.EnterpGasModel;
import MajorHazarderModel = MajorHazardStatisticsInfoServiceNs.MajorHazarderModel;
import MajorHazarderGasModel = MajorHazardStatisticsInfoServiceNs.MajorHazarderGasModel;

interface LevelNumModel {
  levelSm: number;
  levelXm: number;
  levelLm: number;
  levelGm: number;
}

interface GasNumModel {
  GasSm: number;
  GasXm: number;
  GasLm: number;
}

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
  levelArray: EnterpHazardModel[];
  gasArray: EnterpGasModel[];
  majorHazardLevelNum: LevelNumModel;
  GasNumber: GasNumModel;

  constructor(private dataService: MajorHazardStatisticsInfoService, private cdr: ChangeDetectorRef) {
    this.levelArray = [];
    this.gasArray = [];
    this.majorHazardLevelNum = {
      levelSm: 0,
      levelXm: 0,
      levelLm: 0,
      levelGm: 0,
    };
    this.GasNumber = {
      GasSm: 0,
      GasXm: 0,
      GasLm: 0,
    };
  }

  async getDetail() {
    this.dataInfo = await this.dataService.getEnterpriseInfoDetail();
    this.dataInfo.level.forEach((item, index) => {
      const levelObject = {
        majorHazardLevel: item.majorHazardLevel,
        majorHazardRatio: item.majorHazardRatio,
        majorHazardNum: item.majorHazardNum,
      };
      this.levelArray.push(levelObject);
      switch (item.majorHazardLevel) {
        case MajorHazarderModel.HazardlevelSm:
          this.majorHazardLevelNum.levelSm = this.levelArray[index].majorHazardNum;
          break;
        case MajorHazarderModel.HazardlevelXm:
          this.majorHazardLevelNum.levelXm = this.levelArray[index].majorHazardNum;
          break;
        case MajorHazarderModel.HazardlevelLm:
          this.majorHazardLevelNum.levelLm = this.levelArray[index].majorHazardNum;
          break;
        case MajorHazarderModel.HazardlevelGm:
          this.majorHazardLevelNum.levelGm = this.levelArray[index].majorHazardNum;
          break;
        default:
          return;
      }
    });
    this.dataInfo.gas.forEach((item, index) => {
      const gasObject = {
        gas: item.gas,
        entprNum: item.entprNum,
        gasRatio: item.gasRatio,
      };
      this.gasArray.push(gasObject);
      switch (item.gas) {
        case MajorHazarderGasModel.HazardGaslevelSm:
          this.GasNumber.GasSm = this.gasArray[index].entprNum;
          break;
        case MajorHazarderGasModel.HazardGaslevelXm:
          this.GasNumber.GasXm = this.gasArray[index].entprNum;
          break;
        case MajorHazarderGasModel.HazardGaslevelLm:
          this.GasNumber.GasLm = this.gasArray[index].entprNum;
          break;
        default:
          return;
      }
    });
    //console.log(this.gasArray);
    this.initPie();
    this.initRing();
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
          name: '重大危险源占比',
          type: 'pie',
          radius: [20, 150],
          roseType: 'area',
          labelLine: {
            normal: {
              show: true,
            },
          },
          data: [
            { value: this.majorHazardLevelNum.levelSm, name: '一级' },
            { value: this.majorHazardLevelNum.levelXm, name: '二级' },
            { value: this.majorHazardLevelNum.levelLm, name: '三级' },
            { value: this.majorHazardLevelNum.levelGm, name: '四级' },
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
        formatter: '{b}: {c}家',
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
          value: this.GasNumber.GasSm,
          name: '易燃',
        }, {
          value: this.GasNumber.GasXm,
          name: '有毒',
        }, {
          value: this.GasNumber.GasLm,
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
        /* label: {
             normal: {
               position: 'inner',
               formatter: '{c}家',
               textStyle: {
                 color: '#777777',
                 fontWeight: 'bold',
                 fontSize: 14,
               },
             },
           },*/
        /*  data: [{
             value: 39,
             name: '易燃',
           }, {
             value: 59,
             name: '有毒',
           }, {
             value: 105,
             name: '易燃兼有毒',
           }],*/
      }],
    };
  }

  ngOnInit() {
    this.getDetail();
  }

  _onReuseInit() {
    this.ngOnInit();
  }

}
