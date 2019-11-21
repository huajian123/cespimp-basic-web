import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EVENT_KEY } from '@env/staticVariable';
import { localUrl } from '@env/environment';
import { LoginService, LoginServiceNs } from '@core/biz-services/login-services/login.service';
import UrlsModelInterface = LoginServiceNs.UrlsModelInterface;

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


@Component({
  selector: 'app-login-platform',
  templateUrl: './login-platform.component.html',
  styleUrls: ['./login-platform.scss'],
})
export class LoginPlatformComponent implements OnInit {
  sideEnum = SideEnum;
  currentSideIndex: number;
  radarWaterOption: any;
  radarContaminatedOption: any;
  pipeOption: any;
  currentPageNum: number;
  pageTypeEnum = PageTypeEnum;
  loginUrls: UrlsModelInterface;

  constructor(private router: Router, private loginService: LoginService) {
    this.currentSideIndex = this.sideEnum.IntegratedMnageControl;
    this.currentPageNum = this.pageTypeEnum.MainPage;
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
    };
  }

  changeSideIndex(currentSideIndex) {
    if (currentSideIndex === SideEnum.ParkIntroduction) {
      this.goPackIntroduction();
    }
    if (currentSideIndex === SideEnum.WisdomEmergencyPro || currentSideIndex === SideEnum.ClosedPark || currentSideIndex === SideEnum.RiskControl || currentSideIndex === SideEnum.ParkIntroduction) {
      this.currentSideIndex = SideEnum.IntegratedMnageControl;
      if(currentSideIndex===SideEnum.ClosedPark){
        this.goUrl(this.loginUrls.gardenDTO.garden);
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
          { name: 'Ⅰ', max: 6500, fontSize: 12 },
          { name: '劣Ⅴ', max: 16000, fontSize: 12 },
          { name: 'Ⅴ', max: 30000, fontSize: 12 },
          { name: 'Ⅳ', max: 38000, fontSize: 12 },
          { name: 'Ⅲ', max: 52000, fontSize: 12 },
          { name: 'Ⅱ', max: 25000, fontSize: 12 },
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
        name: '全年周水质入水口 vs 全年周水质出水口',  // 系列名称,全年周水质分布雷达图。
        type: 'radar',
        data: [
          {
            value: [800, 7000, 20000, 35000, 31000, 15000],
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
          {
            value: [3000, 15000, 28000, 31000, 17000, 8000],
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

          },
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
        name: '污染物入水口 vs 污染物出水口',  // 全年主要污染物分布雷达图
        type: 'radar',
        data: [
          {
            value: [4500, 10000, 20000, 31000, 30000, 18000],
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
          },
          {
            value: [3000, 10000, 23000, 11000, 22000, 18000],
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
        ],
      }],
    };
  }

  initPipeOption() {
    this.pipeOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        data: ['一级', '二级', '三级', '四级'],
        x: 'right',
        y: 'center',
        left: '180px',
        height: '120px',
        textStyle: {
          color: '#ffffff',
        },
        formatter: function(name) {
          let index = 0;
          let clientlabels = ['一级', '二级', '三级', '四级'];
          let clientcounts = [335, 310, 234, 135];
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
          center: ['35%', '50%'],
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
            { value: 335, name: '一级' },
            { value: 310, name: '二级' },
            { value: 234, name: '三级' },
            { value: 135, name: '四级' },
          ],
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
    window.open(localUrl + '/login-manage/park-introduction', '_blank');
  }

  async goLoginPage() {
    window.sessionStorage.clear();
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

  goUrl(url){
    window.open(url, '_blank');
  }

  ngOnInit() {
    // this.loginUserInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.intiRadarOption();
    this.initPipeOption();
    this.getPageUrls();
  }
}
