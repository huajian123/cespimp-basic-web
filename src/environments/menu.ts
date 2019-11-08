export const menus = [
  {
    text: '基础信息',
    group: false,
    hideInBreadcrumb: true,
    children: [
      {
        'text': '基础信息',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '基础信息',
            'link': '/basic-info/basic-info',
          },
          {
            'text': '重大危险源',
            'link': '/basic-info/major-hazard',
          },
          {
            'text': '阈值初始化',
            'link': '/basic-info/threshold-init',
          },
          {
            'text': '高危工艺初始化',
            'link': '/basic-info/high-risk-init',
          },
          {
            'text': '监测数据',
            'link': '/basic-info/monitoring-data',
          },
        ],
      },
    ],
  },
  {
    text: '危险源监控',
    group: false,
    hideInBreadcrumb: false,
    children: [
      {
        'text': '危险源监控',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '风险承诺',
            'link': '/hazard-source-monitor/risk-commitment',
          },
          {
            'text': '摄像头管理',
            'link': '/hazard-source-monitor/camera-manage',
          },
        ],
      },
    ],
  },
  {
    text: '人员车辆监控',
    group: false,
    hideInBreadcrumb: false,
    children: [
      {
        'text': '人员车辆监控',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '基础信息管理',
            'link': '/people-car-monitor/base-info-manage',
          },
          {
            'text': '实名制进出管理',
            'link': '/people-car-monitor/real-name-in-out',
          },
          {
            'text': '报警区域管理',
            'link': '/people-car-monitor/alarm-area-manage',
          },
          {
            'text': '应急管理',
            'link': '/people-car-monitor/emergency-manage',
          },
        ],
      },
    ],
  },
  {
    text: '区域风险监控',
    group: false,
    hideInBreadcrumb: false,
    children: [
      {
        'text': '区域风险监控',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '实时风险',
            'link': '/risk-monitoring/real-time-risk',
          },
          {
            'text': '风险区域管理',
            'link': '/risk-monitoring/risk-monitoring-manage',
          },
          {
            'text': '两单三卡信息管理',
            'link': '/risk-monitoring/cards-info-manage',
          },
        ],
      },
    ],
  },
  {
    text: '全流程监控',
    group: false,
    hideInBreadcrumb: false,
    children: [
      {
        'text': '全流程监控',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '基础数据管理',
            'link': '/whole-process-monitor/basic-info-manage',
          },
          {
            'text': '告警信息管理',
            'link': '/whole-process-monitor/alarm-info-manage',
          },
        ],
      },
    ],
  },
];
