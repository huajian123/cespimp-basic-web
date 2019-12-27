import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  EnterpStatisticsInfoService,
  EnterpStatisticsInfoServiceNs,
} from '@core/biz-services/basic-info/basic-info-statistics.service';
import EnterpStatisticsModel = EnterpStatisticsInfoServiceNs.EnterpStatisticsModel;
import EntprScaleDTOS = EnterpStatisticsInfoServiceNs.EntprScaleDTOS;
import EntprStandLevelDTOS = EnterpStatisticsInfoServiceNs.EntprStandLevelDTOS;
import EntprEcoDTOS = EnterpStatisticsInfoServiceNs.EntprEcoDTOS;
import EntprScaleModel = EnterpStatisticsInfoServiceNs.EntprScaleModel;
import EntprStandLevelModel = EnterpStatisticsInfoServiceNs.EntprStandLevelModel;
import EntprEcoModel = EnterpStatisticsInfoServiceNs.EntprEcoModel;


interface ScaleNumberModel {
  scaleSm: number;
  scaleXm: number;
  scaleLm: number;
}

interface StandLevelModel {
  standLevelLm: number;
  standLevelXm: number;
  standLevelSm: number;
}

interface EnterpEcoModel {
  shareHold: number,
  foreign: number,
  entprEco: number,
  private: number,
  collective: number,
  individual: number,
  stateOwned: number,
  jointVenture: number,
  other: number;
}

@Component({
  selector: 'app-basic-info-basic-info-statistics',
  templateUrl: './basic-info-statistics.component.html',
  styleUrls: ['./basic-info-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoBasicInfoStatisticsComponent implements OnInit {
  ColumnarOption: any;
  CakeOption: any;
  dataInfo: EnterpStatisticsModel;
  EntprScaleArray: EntprScaleDTOS[];
  EntprStandLevelArray: EntprStandLevelDTOS[];
  EntprEcoArray: EntprEcoDTOS[];
  entprStandLevelNumber: StandLevelModel;
  entprScaleNumber: ScaleNumberModel;
  entprEcoNumber: EnterpEcoModel;


  constructor(private cdr: ChangeDetectorRef, private dataService: EnterpStatisticsInfoService) {
    this.EntprScaleArray = [];
    this.EntprStandLevelArray = [];
    this.EntprEcoArray = [];
    this.entprScaleNumber = {
      scaleSm: 0,
      scaleXm: 0,
      scaleLm: 0,
    };
    this.entprEcoNumber = {
      shareHold: 0,
      foreign: 0,
      entprEco: 0,
      private: 0,
      collective: 0,
      individual: 0,
      stateOwned: 0,
      jointVenture: 0,
      other: 0,
    }
    ;
    this.entprStandLevelNumber = {
      standLevelLm: 0,
      standLevelXm: 0,
      standLevelSm: 0,
    };

  }

  async getDetail() {
    this.dataInfo = await this.dataService.getEnterpStatisticsInfoDetail();
    this.dataInfo.statisticsEntprScaleDTOS.forEach((item, index) => {
      const ScaleObject = {
        entprScale: item.entprScale,
        entprNum: item.entprNum,
      };
      this.EntprScaleArray.push(ScaleObject);
      switch (item.entprScale) {
        case EntprScaleModel.entprScaleLm:
          this.entprScaleNumber.scaleLm = this.EntprScaleArray[index].entprNum;
          break;
        case EntprScaleModel.entprScaleXm:
          this.entprScaleNumber.scaleXm = this.EntprScaleArray[index].entprNum;
          break;
        case EntprScaleModel.entprScaleSm:
          this.entprScaleNumber.scaleSm = this.EntprScaleArray[index].entprNum;
          break;
        default:
          return;
      }
    });
    this.dataInfo.statisticsEntprStandLevelDTOS.forEach((item, index) => {
      const LevelObjects = {
        standLevel: item.standLevel,
        entprNum: item.entprNum,
      };
      this.EntprStandLevelArray.push(LevelObjects);
      switch (item.standLevel) {
        case EntprStandLevelModel.entprStandLevelLm:
          this.entprStandLevelNumber.standLevelLm = this.EntprStandLevelArray[index].entprNum;
          break;
        case EntprStandLevelModel.entprStandLevelXm:
          this.entprStandLevelNumber.standLevelXm = this.EntprStandLevelArray[index].entprNum;
          break;
        case EntprStandLevelModel.entprStandLevelSm:
          this.entprStandLevelNumber.standLevelSm = this.EntprStandLevelArray[index].entprNum;
          break;
        default:
          return;
      }
    });
    this.dataInfo.statisticsEntprEcoDTOS.forEach((item, index) => {
      const EcoObject = {
        entprEcoType: item.entprEcoType,
        entprEcoRatio: item.entprEcoRatio,
      };
      this.EntprEcoArray.push(EcoObject);
      switch (item.entprEcoType) {
        case EntprEcoModel.ShareHoldingSystem:
          this.entprEcoNumber.shareHold = this.EntprEcoArray[index].entprEcoRatio;
          break;
        case EntprEcoModel.ForeignInvestment:
          this.entprEcoNumber.foreign = this.EntprEcoArray[index].entprEcoRatio;
          break;
        case EntprEcoModel.EntprEcoInvestment:
          this.entprEcoNumber.entprEco = this.EntprEcoArray[index].entprEcoRatio;
          break;
        case EntprEcoModel.PrivateEconomy:
          this.entprEcoNumber.private = this.EntprEcoArray[index].entprEcoRatio;
          break;
        case EntprEcoModel.CollectiveEconomy:
          this.entprEcoNumber.collective = this.EntprEcoArray[index].entprEcoRatio;
          break;
        case EntprEcoModel.IndividualEconomy:
          this.entprEcoNumber.individual = this.EntprEcoArray[index].entprEcoRatio;
          break;
        case EntprEcoModel.StateOwnedEconomy:
          this.entprEcoNumber.stateOwned = this.EntprEcoArray[index].entprEcoRatio;
          break;
        case EntprEcoModel.JointVentureEconomy:
          this.entprEcoNumber.jointVenture = this.EntprEcoArray[index].entprEcoRatio;
          break;
        case EntprEcoModel.Other:
          this.entprEcoNumber.other = this.EntprEcoArray[index].entprEcoRatio;
          break;
        default:
          return;
      }
    });
    this.initColumnar();
    this.initCake();
    this.cdr.markForCheck();
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
        formatter(name) {
          return '' + name;
        },
      },
      series: [{
        type: 'pie',
        clockwise: false, // 饼图的扇区是否是顺时针排布
       /* minAngle: 2,*/ // 最小的扇区角度（0 ~ 360）
        radius: ['40%', '70%'],
        center: ['30%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: { // 图形样式
          normal: {
            borderColor: '#ffffff',
            borderWidth: 6,
          },
        },
        label: {
          normal: {
            show: false,
            position: 'center',
            formatter: '{text|{b}}\n {d}%',
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
          value: this.entprEcoNumber.shareHold,
        },
          {
            name: '外商投资',
            value: this.entprEcoNumber.foreign,
          },
          {
            name: '港澳台投资',
            value: this.entprEcoNumber.entprEco,
          },
          {
            name: '私营经济',
            value: this.entprEcoNumber.private,
          },
          {
            name: '集体经济',
            value: this.entprEcoNumber.collective,
          },
          {
            name: '个体经济',
            value: this.entprEcoNumber.individual,
          },
          {
            name: '国有经济',
            value: this.entprEcoNumber.stateOwned,
          },
          {
            name: '联营经济',
            value: this.entprEcoNumber.jointVenture,
          },
          {
            name: '其他',
            value: this.entprEcoNumber.other,
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
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '5%',
        containLabel: true,
      },
      xAxis: [{
        type: 'category',
        axisTick: {
          show: false,
          color: '#707070',
        },
        axisLabel: {
          textStyle: {
            fontSize: 14,
            color: '#4D4D4D',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#707070',
          },
        },
        data: ['大型企业', '中型企业', '小型企业', '标准化一级', '标准化二级', '标准化三级'],
      }],
      yAxis: {
        type: 'value',
        name: '企业数量',
        nameTextStyle: {
          fontSize: 14,
          color: '#4D4D4D',
        },
        axisLabel: {
          textStyle: {
            fontSize: 12,
            color: '#4D4D4D',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#707070',
          },
        },
      },
      series: [{
        name: '企业数量（个）',
        type: 'bar',
        barWidth: '40%',
        data: [
          {
            name: '大型企业',
            value: this.entprScaleNumber.scaleLm,
            itemStyle: {
              color: '#1F78B4',
            },
          },
          {
            name: '中型企业',
            value: this.entprScaleNumber.scaleXm,
            itemStyle: {
              color: '#A6CEE3',
            },
          },
          {
            name: '小型企业',
            value: this.entprScaleNumber.scaleSm,
            itemStyle: {
              color: '#B2DF8A',
            },
          },
          {
            name: '标准化一级',
            value: this.entprStandLevelNumber.standLevelLm,
            itemStyle: {
              color: '#33A02C',
            },
          },
          {
            name: '标准化二级',
            value: this.entprStandLevelNumber.standLevelXm,
            itemStyle: {
              color: '#FB9A99',
            },
          },
          {
            name: '标准化三级',
            value: this.entprStandLevelNumber.standLevelSm,
            itemStyle: {
              color: '#E31A1C',
            },
          },
        ],
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
