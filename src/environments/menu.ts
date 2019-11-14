import { RoleEnum } from '@core/vo/comm/BusinessEnum';

export const menus = [
  {
    text: '安全一张图',
    group: false,
    hideInBreadcrumb: false,
    children: [
      {
        'text': '安全一张图',
        'icon': 'anticon-appstore',
        'link': '/safety-map/safety-map-list',
        'children': [],
      },
    ],
  },
  {
    text: '企业基本信息管理',
    group: false,
    hideInBreadcrumb: true,
    children: [
      {
        'text': '企业基本信息管理',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '基本信息列表',
            'link': '/basic-info/basic-info',
            'acl': RoleEnum[RoleEnum.ParkManage],
          },
          {
            'text': '基本信息审核列表',
            'link': '/basic-info/basic-info-audit-list',
          },
          {
            'text': '基本信息统计',
            'link': '/basic-info/basic-info-statistics',
          },
        ],
      },
    ],
  },
  {
    text: '重点监管对象管理',
    group: false,
    hideInBreadcrumb: false,
    children: [
      {
        'text': '重点监管对象管理',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '重点监管危险化学品列表',
            'link': '/key-supervision-management/key-hazardous-chemicals-list',
          },
          {
            'text': '重点监管危险化工工艺列表',
            'link': '/key-supervision-management/hazardous-chemical-processes-list',
          },
        ],
      },
    ],
  },
  {
    text: '重大危险源管理',
    group: false,
    hideInBreadcrumb: false,
    children: [
      {
        'text': '重大危险源管理',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '重大危险源列表',
            'link': '/major-hazard-management/major-hazard-list',
          },
          {
            'text': '重大危险源备案列表 ',
            'link': '/major-hazard-management/major-hazardrecord-list',
          },
          {
            'text': '重大危险源统计',
            'link': '/major-hazard-management/major-hazardstatistics-list',
          },
        ],
      },
    ],
  },
  {
    text: '储罐管理',
    group: false,
    hideInBreadcrumb: false,
    children: [
      {
        'text': '储罐管理',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '储罐列表',
            'link': '/storage-tank-management/tank-list',
          },
        ],
      },
    ],
  },
  {
    text: '仓库管理',
    group: false,
    hideInBreadcrumb: false,
    children: [
      {
        'text': '仓库管理',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '仓库列表',
            'link': '/warehouse-management/warehouse-list',
          },
        ],
      },
    ],
  },
  {
    text: '生产场所管理',
    group: false,
    hideInBreadcrumb: false,
    children: [
      {
        'text': '生产场所管理',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '生产场所列表',
            'link': '/production-management/production-list',
          },
        ],
      },
    ],
  },
  {
    text: '传感器管理',
    group: false,
    hideInBreadcrumb: false,
    children: [
      {
        'text': '传感器管理',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '传感器列表',
            'link': '/whole-process-monitor/basic-info-manage',
          },
          {
            'text': '传感器实时数据',
            'link': '/whole-process-monitor/alarm-info-manage',
          },
          {
            'text': '传感器历史数据',
            'link': '/whole-process-monitor/alarm-info-manage',
          },
        ],
      },
    ],
  },
  {
    text: '摄像头管理',
    group: false,
    hideInBreadcrumb: false,
    children: [
      {
        'text': '摄像头管理',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '摄像头列表',
            'link': '/risk-monitoring/real-time-risk',
          },
        ],
      },
    ],
  },
  {
    text: '报警管理',
    group: false,
    hideInBreadcrumb: false,
    children: [
      {
        'text': '报警管理',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '实时报警',
            'link': '/whole-process-monitor/basic-info-manage',
          },
          {
            'text': '历史报警',
            'link': '/whole-process-monitor/alarm-info-manage',
          },
        ],
      },
    ],
  },
  {
    text: '特种作业管理',
    group: false,
    hideInBreadcrumb: false,
    children: [
      {
        'text': '特种作业管理',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '特种作业列表',
            'link': '/risk-monitoring/real-time-risk',
          },
        ],
      },
    ],
  },
];
