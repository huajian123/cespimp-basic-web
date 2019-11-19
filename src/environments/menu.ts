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
          /*园区*/
          {
            'text': '基本信息列表',
            'link': '/basic-info/basic-info',
            'acl': RoleEnum[RoleEnum.ParkManage],
          },
          {
            'text': '基本信息审核列表',
            'link': '/basic-info/basic-info-audit-list',
            'acl': RoleEnum[RoleEnum.ParkManage],
          },
          {
            'text': '基本信息统计',
            'link': '/basic-info/basic-info-statistics',
            'acl': RoleEnum[RoleEnum.ParkManage],
          },
          /*企业管理员*/
          {
            'text': '企业基本信息',
            'link': '/basic-info/basic-info-audit-list',
            'acl': RoleEnum[RoleEnum.Enterprise],
          },
          {
            'text': '证照信息',
            'link': '/basic-info/basic-info-audit-list',
            'acl': RoleEnum[RoleEnum.Enterprise],
          },
          {
            'text': '企业周边环境信息',
            'link': '/basic-info/basic-info-audit-list',
            'acl': RoleEnum[RoleEnum.Enterprise],
          },
          {
            'text': '生产原料信息',
            'link': '/basic-info/basic-info-audit-list',
            'acl': RoleEnum[RoleEnum.Enterprise],
          },
          {
            'text': '中间产品信息',
            'link': '/basic-info/basic-info-audit-list',
            'acl': RoleEnum[RoleEnum.Enterprise],
          },
          {
            'text': '最终产品信息',
            'link': '/basic-info/basic-info-audit-list',
            'acl': RoleEnum[RoleEnum.Enterprise],
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
            'text': '储罐列表',
            'link': '/storage-tank-management/tank-list',
            'acl': RoleEnum[RoleEnum.Enterprise],
          },
          {
            'text': '库房列表',
            'link': '/warehouse-management/warehouse-list',
            'acl': RoleEnum[RoleEnum.Enterprise],
          },
          {
            'text': '生产场所列表',
            'link': '/production-management/production-list',
            'acl': RoleEnum[RoleEnum.Enterprise],
          },

          {
            'text': '重大危险源列表',
            'link': '/major-hazard-management/major-hazard-list',
          },
          {
            'text': '重大危险源备案列表 ',
            'link': '/major-hazard-management/major-hazard-record-list',
            'acl': RoleEnum[RoleEnum.ParkManage],
          },
          {
            'text': '重大危险源统计',
            'link': '/major-hazard-management/major-hazard-statistics-list',
            'acl': RoleEnum[RoleEnum.ParkManage],
          },
        ],
      },
    ],
  },
  {
    text: '储罐管理',
    group: false,
    hideInBreadcrumb: false,
    'acl': RoleEnum[RoleEnum.ParkManage],
    children: [
      {
        'text': '储罐管理',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '储罐列表',
            'link': '/storage-tank-management/tank-list',
            'acl': RoleEnum[RoleEnum.ParkManage],
          },
        ],
      },
    ],
  },
  {
    text: '库房管理',
    group: false,
    hideInBreadcrumb: false,
    'acl': RoleEnum[RoleEnum.ParkManage],
    children: [
      {
        'text': '库房管理',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '库房列表',
            'link': '/warehouse-management/warehouse-list',
            'acl': RoleEnum[RoleEnum.ParkManage],
          },
        ],
      },
    ],
  },
  {
    text: '生产场所管理',
    group: false,
    hideInBreadcrumb: false,
    'acl': RoleEnum[RoleEnum.ParkManage],
    children: [
      {
        'text': '生产场所管理',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '生产场所列表',
            'link': '/production-management/production-list',
            'acl': RoleEnum[RoleEnum.ParkManage],
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
            'text': '动火作业',
            'link': '/risk-monitoring/real-time-risk',
          },
          {
            'text': '受限空间作业',
            'link': '/risk-monitoring/real-time-risk',
          },
          {
            'text': '高处作业',
            'link': '/risk-monitoring/real-time-risk',
          },
          {
            'text': '吊装作业',
            'link': '/risk-monitoring/real-time-risk',
          },
          {
            'text': '临时用电',
            'link': '/risk-monitoring/real-time-risk',
          },
          {
            'text': '设备检修',
            'link': '/risk-monitoring/real-time-risk',
          },
          {
            'text': '盲板抽堵',
            'link': '/risk-monitoring/real-time-risk',
          },
          {
            'text': '断路作业',
            'link': '/risk-monitoring/real-time-risk',
          },
          {
            'text': '动土作业',
            'link': '/risk-monitoring/real-time-risk',
          },
        ],
      },
    ],
  },
];
