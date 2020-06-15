import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EVENT_KEY } from '@env/staticVariable';
import { localUrl } from '@env/environment';
import { LoginService, LoginServiceNs } from '@core/biz-services/login-services/login.service';
import UrlsModelInterface = LoginServiceNs.UrlsModelInterface;
import { RoleEnum } from '@core/vo/comm/BusinessEnum';
import {
  LoginWorkBoardService,
  LoginWorkBoardServiceNs,
} from '@core/biz-services/login-work-board/login-work-board.service';
import AirQualityModel = LoginWorkBoardServiceNs.AirQualityModel;
import WaterQualityModel = LoginWorkBoardServiceNs.WaterQualityModel;
import HighProcessModel = LoginWorkBoardServiceNs.HighProcessModel;
import HazardLevelModel = LoginWorkBoardServiceNs.HazardLevelModel;
import { MapSet } from '@shared/directives/pipe/map.pipe';

enum levelNum {
  one = 1,
  two = 2,
  three = 3,
  four = 4,
}

enum SideEnum {
  IntegratedMnageControl, // 综合管控
  WisdomEnvirPro, // 智慧环保
  WisdomSafePro, // 智慧安全
  WisdomEmergencyPro, // 智慧应急
  ClosedPark, // 封闭园区
  RiskControl, // 风险管控
  ParkIntroduction // 园区介绍
}

enum PageTypeEnum {
  Announcement = 1, // 公告
  IndustryNews, // 行业动态发布
  FileNotifi, // 文件通知
  ParkIntroduction, // 园区介绍
  MainPage,
  AnnouncementDetail,
  IndustryNewsDetail
}

enum AirQualityLevelEnum {
  Excellent = 1,
  Good,
  MildPollution,
  ModeratePollution,
  SeverePollution,
  SeriousPollution
}


@Component({
  selector: 'app-login-platform',
  templateUrl: './login-platform.component.html',
  styleUrls: ['./login-platform.scss'],
})
export class LoginPlatformComponent implements OnInit, OnDestroy {
  sideEnum = SideEnum;
  currentSideIndex: number;
  radarWaterOption: any;
  radarContaminatedOption: any;
  pipeOption: any;
  pipeOptionTwo: any;
  currentPageNum: number;
  pageTypeEnum = PageTypeEnum;
  loginUrls: UrlsModelInterface;
  localUrl: string;
  airQualityData: AirQualityModel;
  waterQualityData: WaterQualityModel;
  hazardLevelData: HazardLevelModel[];
  highProcessData: HighProcessModel[];
  airLevelColor: string;
  realName: string;
  DataValueArray: any;
  getDataFun: any;

  constructor(private router: Router, private loginService: LoginService, private loginWorkBoardService: LoginWorkBoardService, private cdr: ChangeDetectorRef) {
    this.currentSideIndex = this.sideEnum.IntegratedMnageControl;
    this.currentPageNum = this.pageTypeEnum.MainPage;
    this.DataValueArray = [];
    this.loginUrls = {
      synthesisMonitoring: {
        oneGrandOneFile: '',
        levelAlarm: '',
        ldar: '',
        workingMonitoring: '',
      },
      emergencyDTO: {
        emergency: '',
      },
      environmentalDTO: {
        environmentalLogin: '',
        environmentalMap: '',
        capacityMonitoring: '',
        dataResearch: '',
        polluteSource: '',
      },
      gardenDTO: {
        garden: '',
      },
      riskMonitoring: {
        riskMonitoring: '',
      },
    };
    this.localUrl = localUrl;

    this.airQualityData = {
      'dateTime': '2019-11-28',
      'aqiValue': 0,
      'mainPolluter': '无',
      'status': null,
      'total': null,
      'rate': '',
      'goodDays': null,
      'noTwo': '',
      'soTwo': '',
      'pmTwoDotFive': '',
      'pmTen': '',
      'co': '',
      'othree': '',
    };
    this.waterQualityData = {
      'levelOne': 0,
      'levelTwo': 0,
      'levelThree': 1,
      'levelFour': 0,
      'levelFive': 0,
      'levelSix': 7,
      'siteName': '化工园区下游水站',
      'dissolveOxygen': 0,
      'ammoniaNitrogen': 0,
      'standardLevel': 4,
      'totalPhosphorus': 0,
      'thisLevel': 6,
      'overFlag': true,
      'permanganate': 0,
      'itemNames': [
        '氨氮',
        '高锰酸盐指数',
        '总磷',
        '总氮',
        'PH',
        '溶解氧',
      ],
      'totalNitrogen': 7,
      'ph': 0,
    };
    this.hazardLevelData = [];
    this.highProcessData = [];
    this.airLevelColor = '#30d284';
    this.realName = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo)).realName;

  }

  changeSideIndex(currentSideIndex) {
    // 智慧应急
    if (currentSideIndex === SideEnum.WisdomEmergencyPro) {
      this.goUrl(this.loginUrls.emergencyDTO.emergency);
      return;
    }

    if (currentSideIndex === SideEnum.ParkIntroduction) {
      this.goPackIntroduction();
      return;
    }
    if (currentSideIndex === SideEnum.ClosedPark || currentSideIndex === SideEnum.RiskControl || currentSideIndex === SideEnum.ParkIntroduction) {
      this.currentSideIndex = SideEnum.IntegratedMnageControl;
      if (currentSideIndex === SideEnum.ClosedPark) {
        this.goUrl(this.loginUrls.gardenDTO.garden);
      }
      // 风险管控
      if (currentSideIndex === SideEnum.RiskControl) {
        this.goUrl(this.loginUrls.riskMonitoring.riskMonitoring);
      }
      return;
    }
    this.currentSideIndex = currentSideIndex;
  }

  intiRadarOption() {
    this.radarWaterOption = {
      backgroundColor: 'rgba(255,255,255,0 )', // 全图背景色
      tooltip: { trigger: 'item', show: false }, // 取消鼠标事件
      legend: {},
      radar: {
        name: {
          textStyle: {
            color: '#fff',
            // backgroundColor: '#aaa',
            borderRadius: 3,
            lineHeight: 1,
            fontSize: 10,
            // padding: [5, 5]
          },
        },
        nameGap: 2, // 名字与指示器的距离
        indicator: [
          { name: 'Ⅰ', max: 52, fontSize: 12 },
          { name: '劣Ⅴ', max: 52, fontSize: 12 },
          { name: 'Ⅴ', max: 52, fontSize: 12 },
          { name: 'Ⅳ', max: 52, fontSize: 12 },
          { name: 'Ⅲ', max: 52, fontSize: 12 },
          { name: 'Ⅱ', max: 52, fontSize: 12 },
        ],
        splitNumber: 4,
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(0,0,0,0)', 'rgba(200,200,200,0.1)'], // 分隔区域颜色
          },
        },
        splitLine: {                        // (这里是指所有圆环)坐标轴在 grid 区域中的分隔线。
          lineStyle: {
            color: 'rgba(250,250,250,0.1)',                       // 分隔线颜色
            width: 2, 							 // 分隔线线宽
          },
        },
        axisLine: {                         // (圆内的几条直线)坐标轴轴线相关设置
          lineStyle: {
            color: 'rgba(250,250,250,0.1)',                   // 坐标轴线线的颜色。
            width: 1,                      	 // 坐标轴线线宽。
            type: 'solid',                   // 坐标轴线线的类型。
          },
        },
      },
      series: [{
        name: '化工园区下游水站 vs 化工园区上游水站',  // 系列名称,全年周水质分布雷达图。
        type: 'radar',
        data: [
          {
            value: [this.waterQualityData.levelOne, this.waterQualityData.levelSix, this.waterQualityData.levelFive, this.waterQualityData.levelFour, this.waterQualityData.levelThree, this.waterQualityData.levelTwo],
            itemStyle: {
              normal: {
                color: '#00E3FF',
                lineStyle: {
                  color: '#00E3FF',
                },
              },
            },
            areaStyle: {
              normal: {
                color: 'rgba(0,227,255,0.3)',
              },

            },
          },
          /*    {
                value: [1000, 7000, 20000, 38000, 25000, 7000],
                itemStyle: {
                  normal: {
                    color: 'rgba(255,64,192)',
                    lineStyle: {
                      color: 'rgba(255,64,192)',
                    },
                  },
                },
                areaStyle: {
                  normal: {
                    color: 'rgba(255,64,192,0.6)',
                  },

                },

              },*/
        ],
      }],
    };
    this.radarContaminatedOption = {
      backgroundColor: 'rgba(255,255,255,0 )', // 全图背景色
      tooltip: { trigger: 'item', show: false },
      legend: {},
      radar: {
        name: {
          textStyle: {
            color: '#fff',
            // backgroundColor: '#aaa',
            borderRadius: 3,
            lineHeight: 1,
            fontSize: 10,
            // padding: [5, 5]
          },
        },
        nameGap: 6, // 名字与指示器的距离
        indicator: [
          { name: 'COD', max: 6500, fontSize: 12 },
          { name: '氨氮', max: 16000, fontSize: 12 },
          { name: '总氮', max: 30000, fontSize: 12 },
          { name: '高锰酸盐指数', max: 38000, fontSize: 12 },
          { name: 'PH', max: 52000, fontSize: 12 },
          { name: '总磷', max: 25000, fontSize: 12 },
        ],
        splitNumber: 4,
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(0,0,0,0)', 'rgba(200,200,200,0.1)'], // 分隔区域颜色
          },
        },
        splitLine: {                        // (这里是指所有圆环)坐标轴在 grid 区域中的分隔线。
          lineStyle: {
            color: 'rgba(250,250,250,0.1)',                       // 分隔线颜色
            width: 2, 							 // 分隔线线宽
          },
        },
        axisLine: {                         // (圆内的几条直线)坐标轴轴线相关设置
          lineStyle: {
            color: 'rgba(250,250,250,0.1)',                   // 坐标轴线线的颜色。
            width: 1,                      	 // 坐标轴线线宽。
            type: 'solid',                   // 坐标轴线线的类型。
          },
        },
      },
      series: [{
        name: '污染物入口 vs 污染物出口',  // 全年主要污染物分布雷达图
        type: 'radar',
        data: [
          {
            value: [5500, 10000, 22000, 20000, 25000, 17000],
            itemStyle: {
              normal: {
                color: '#00E3FF',
                lineStyle: {
                  color: '#00E3FF',
                },
              },
            },
            areaStyle: {
              normal: {
                color: 'rgba(0,227,255,0.3)',
              },

            },

          },
          /*  {
              value: [3700, 8000, 17000, 20000, 24000, 13000],
              itemStyle: {
                normal: {
                  color: 'rgba(255,64,192)',
                  lineStyle: {
                    color: 'rgba(255,64,192)',
                  },
                },
              },
              areaStyle: {
                normal: {
                  color: 'rgba(255,64,192,0.6)',
                },

              },
            },*/
        ],
      }],
    };
  }

  initPipeOption() {
    const that = this;
    const hazardLevelPipeObj: any = {
      levelOne: [],
      levelTwo: [],
      levelThree: [],
      levelFour: [],
    };

    this.hazardLevelData.forEach(levelItem => {
      levelItem.entprHazards.forEach((hazardsItem) => {
        let tempEntprObj: any = {};
        tempEntprObj.entprName = hazardsItem.entprName;
        tempEntprObj.hazardName = hazardsItem.hazardName;
        switch (levelItem.majorHazardLevel) {
          case  levelNum.one:
            return hazardLevelPipeObj.levelOne.push(tempEntprObj);
          case  levelNum.two:
            return hazardLevelPipeObj.levelTwo.push(tempEntprObj);
          case  levelNum.three:
            return hazardLevelPipeObj.levelThree.push(tempEntprObj);
          case  levelNum.four:
            return hazardLevelPipeObj.levelFour.push(tempEntprObj);
        }
      });
    });


    this.pipeOption = {
      title: {
        text: '重大危险源等级',
        x: 'center',
        textStyle: {
          color: '#ffffff',
          fontSize: '12px',
        },
        top: '5px',
      },
      tooltip: {
        trigger: 'item',
        /*formatter: '{a} <br/>{b}: {c} ({d}%)',*/
        formatter: (params) => {
          switch (params.data.name) {
            case '一级':
              let strOne = '';
              hazardLevelPipeObj.levelOne.forEach(item => {
                strOne = strOne + item.entprName + ':<br/>' + item.hazardName.join(',') + '<br/>';
              });
              return strOne;
            case '二级':
              let strTwo = '';
              hazardLevelPipeObj.levelTwo.forEach(item => {
                strTwo = strTwo + item.entprName + ':<br/>' + item.hazardName.join(',') + '<br/>';
              });
              return strTwo;
            case '三级':
              let strThree = '';
              hazardLevelPipeObj.levelThree.forEach(item => {
                strThree = strThree + item.entprName + ':<br/>' + item.hazardName.join(',') + '<br/>';
              });
              return strThree;
            case '四级':
              let strFour = '';
              hazardLevelPipeObj.levelFour.forEach(item => {
                strFour = strFour + item.entprName + ':<br/>' + item.hazardName.join(',') + '<br/>';
              });
              return strFour;
          }
        },
      },
      legend: {
        orient: 'vertical',
        data: ['一级', '二级', '三级', '四级'],
        x: 'right',
        y: 'center',
        left: '145px',
        height: '120px',
        textStyle: {
          color: '#ffffff',
        },
        formatter(name) {
          let index = 0;
          const clientlabels = ['一级', '二级', '三级', '四级'];
          const clientcounts = [that.hazardLevelData[0].majorHazardNum,
            that.hazardLevelData[1].majorHazardNum,
            that.hazardLevelData[2].majorHazardNum,
            that.hazardLevelData[3].majorHazardNum,
          ];
          clientlabels.forEach(function(value, i) {
            if (value == name) {
              index = i;
            }
          });
          return name + '  ' + clientcounts[index] + '个';
        },
      },
      color: ['#FF222D', '#EE8E00', '#FFE800', '#0076FF'],
      series: [
        {
          name: '重大危险源个数',
          type: 'pie',
          center: ['32%', '55%'],
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            { value: this.hazardLevelData[0].majorHazardNum, name: '一级' },
            { value: this.hazardLevelData[1].majorHazardNum, name: '二级' },
            { value: this.hazardLevelData[2].majorHazardNum, name: '三级' },
            { value: this.hazardLevelData[3].majorHazardNum, name: '四级' },
          ],
        },
      ],
    };

    this.pipeOptionTwo = {
      title: {
        text: '高危工艺',
        x: 'center',
        textStyle: {
          color: '#ffffff',
          fontSize: '12px',
        },
        top: '5px',
      },
      color: [
        '#c487ee',
        '#deb140',
        '#49dff0',
        '#034079',
        '#6f81da',
        '#4472C5',
        '#ED7C30',
        '#80FF80',
        '#FF8096',
        '#800080',
        '#c23531',
        '#2f4554',
        '#61a0a8',
        '#d48265',
        '#91c7ae',
        '#749f83',
        '#ca8622',
        '#bda29a',
      ],
      tooltip: {
        trigger: 'item',
        // formatter: '{a} <br/>{b}: {c} ({d}%)',
        formatter: (params) => {
          switch (params.data.name) {
            case MapSet.processType[this.highProcessData[0].processesType]:
              return this.highProcessData[0].entprName.join(',');
            case MapSet.processType[this.highProcessData[1].processesType]:
              return this.highProcessData[1].entprName.join(',');
            case MapSet.processType[this.highProcessData[2].processesType]:
              return this.highProcessData[2].entprName.join(',');
            case MapSet.processType[this.highProcessData[3].processesType]:
              return this.highProcessData[3].entprName.join(',');
            case MapSet.processType[this.highProcessData[4].processesType]:
              return this.highProcessData[4].entprName.join(',');
            case MapSet.processType[this.highProcessData[5].processesType]:
              return this.highProcessData[5].entprName.join(',');
            case MapSet.processType[this.highProcessData[6].processesType]:
              return this.highProcessData[6].entprName.join(',');
            case MapSet.processType[this.highProcessData[7].processesType]:
              return this.highProcessData[7].entprName.join(',');
            case MapSet.processType[this.highProcessData[8].processesType]:
              return this.highProcessData[8].entprName.join(',');
            case MapSet.processType[this.highProcessData[9].processesType]:
              return this.highProcessData[9].entprName.join(',');
            case MapSet.processType[this.highProcessData[10].processesType]:
              return this.highProcessData[10].entprName.join(',');
            case MapSet.processType[this.highProcessData[11].processesType]:
              return this.highProcessData[11].entprName.join(',');
            case MapSet.processType[this.highProcessData[12].processesType]:
              return this.highProcessData[12].entprName.join(',');
            case MapSet.processType[this.highProcessData[13].processesType]:
              return this.highProcessData[13].entprName.join(',');
            case MapSet.processType[this.highProcessData[14].processesType]:
              return this.highProcessData[14].entprName.join(',');
            case MapSet.processType[this.highProcessData[15].processesType]:
              return this.highProcessData[15].entprName.join(',');
            case MapSet.processType[this.highProcessData[16].processesType]:
              return this.highProcessData[16].entprName.join(',');
            case MapSet.processType[this.highProcessData[17].processesType]:
              return this.highProcessData[17].entprName.join(',');
          }
        },
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        data: [
          '光气及光气化工艺',
          '电解工艺（氯碱）',
          '氯化工艺',
          '硝化工艺',
          '合成氨工艺',
          '裂解（裂化）工艺',
          '氟化工艺',
          '加氢工艺',
          '重氮化工艺',
          '氧化工艺',
          '过氧化工艺',
          '氨基化工艺',
          '磺化工艺',
          '聚合工艺',
          '烷基化工艺',
          '新型煤化工工艺',
          '电石生产工艺',
          '偶氮化工艺',
        ],
        x: 'left',
        y: 'bottom',
        left: '140px',
        height: '120px',
        pageTextStyle: {
          color: '#fff',
        },
        textStyle: {
          color: '#ffffff',
        },
      },
      /*  grid:{
          left:'-20',
        },*/
      calculable: true,
      series: [
        {
          name: '',
          type: 'pie',
          radius: [15, 60],
          center: ['32%', '55%'],
          roseType: 'radius',
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          lableLine: {
            normal: {
              show: false,
            },
            emphasis: {
              show: true,
            },
          },
          data: this.DataValueArray,
        },

      ],
    };


  }


  // 智慧安全页面
  goSafePage() {
    //   window.open(localUrl + '/main/index', '_blank');
  }

  // 园区一张图页面
  goParkOnePage() {
    // window.open(localUrl + '/suzhou-modules/park-one-page', '_blank');
  }

  // 园区介绍组件
  goPackIntroduction() {
    window.open(localUrl + '/hazard/login-manage/park-introduction', '_blank');
  }

  async goLoginPage() {
    window.sessionStorage.removeItem(EVENT_KEY.loginInfo);
    window.sessionStorage.removeItem(EVENT_KEY.entprBasicInfo);
    window.sessionStorage.removeItem(EVENT_KEY.role);
    await this.loginService.loginOut();
    this.router.navigateByUrl('/passport/login');
  }

  goMainPage() {
    this.currentPageNum = this.pageTypeEnum.MainPage;
  }

  goNoticePage() {
    this.currentPageNum = this.pageTypeEnum.Announcement;
  }

  async getPageUrls() {
    this.loginUrls = await this.loginService.getLoginUrls();
  }

  goUrl(url) {
    const role = window.sessionStorage.getItem(EVENT_KEY.role);
    if (url === 'selfSys') {
      if (role === RoleEnum[RoleEnum.Enterprise]) {
        window.open(localUrl + '/hazard/basic-info/enterprise-basic-info');
      } else if (role === RoleEnum[RoleEnum.ParkManage]) {
        window.open(localUrl + '/hazard/basic-info/basic-info');
      }
      return;
    }
    window.open(url, '_blank');
  }

  // 获取空气质量
  async getAirQualityData() {
    this.airQualityData = await this.loginWorkBoardService.getAirQuality();
    switch (this.airQualityData.status) {
      case AirQualityLevelEnum.Excellent:
        this.airLevelColor = '#30d284';
        break;
      case AirQualityLevelEnum.Good:
        this.airLevelColor = '#ffd802';
        break;
      case AirQualityLevelEnum.MildPollution:
        this.airLevelColor = '#ff9902';
        break;
      case AirQualityLevelEnum.ModeratePollution:
        this.airLevelColor = '#ff0201';
        break;
      case AirQualityLevelEnum.SeverePollution:
        this.airLevelColor = '#980098';
        break;
      case AirQualityLevelEnum.SeriousPollution:
        this.airLevelColor = '#990000';
        break;
    }
    this.cdr.markForCheck();
  }

  // 获取水质质量
  async getWaterQualityData() {
    this.waterQualityData = await this.loginWorkBoardService.getWaterQuality();
    /* switch (this.airQualityData.status) {
       case AirQualityLevelEnum.Excellent:
         this.airLevelColor = '#30d284';
         break;
       case AirQualityLevelEnum.Good:
         this.airLevelColor = '#ffd802';
         break;
       case AirQualityLevelEnum.MildPollution:
         this.airLevelColor = '#ff9902';
         break;
       case AirQualityLevelEnum.ModeratePollution:
         this.airLevelColor = '#ff0201';
         break;
       case AirQualityLevelEnum.SeverePollution:
         this.airLevelColor = '#980098';
         break;
       case AirQualityLevelEnum.SeriousPollution:
         this.airLevelColor = '#990000';
         break;
     }*/
    this.cdr.markForCheck();
  }

//获取重大危险源等级
  async getMajorHazardData() {
    this.hazardLevelData = await this.loginWorkBoardService.getMajorHazard();
    this.hazardLevelData.sort((a, b) => {
      return a.majorHazardLevel - b.majorHazardLevel;
    });
    this.cdr.markForCheck();
  }

//获取高危工艺
  async getHighProcessData() {
    this.highProcessData = await this.loginWorkBoardService.getMajorProcess();
    //console.log(this.highProcessData);
    this.highProcessData.forEach((item) => {
      const ProcessDataObject = {
        value: item.processesNum,
        name: MapSet.processType[item.processesType],
      };
      this.DataValueArray.push(ProcessDataObject);
    });
    this.cdr.markForCheck();
  }

  async ngOnInit() {
    // this.loginUserInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.getPageUrls();
    this.getAirQualityData();
    this.getWaterQualityData();
    await this.getMajorHazardData();
    await this.getHighProcessData();
    this.intiRadarOption();
    this.initPipeOption();

    this.getDataFun = setInterval(() => {
      this.getAirQualityData();
      this.getWaterQualityData();
    }, 30000);
  }

  ngOnDestroy() {
    if (this.getDataFun) {
      clearInterval(this.getDataFun);
    }
  }
}
