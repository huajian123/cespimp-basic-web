import { RoleEnum } from '@core/vo/comm/BusinessEnum';
import { EVENT_KEY } from '@env/staticVariable';

export const menus = [
  {
    text: '安全一张图',
    group: false,
    hideInBreadcrumb: false,
    children: [
      {
        'text': '安全一张图',
        'icon': 'anticon-appstore',
        'link': '/hazard/safety-map/safety-map-list',
        'children': [],
      },
    ],
  },
  {
    text: '一企一档',
    group: false,
    hideInBreadcrumb: true,
    children: [
      {
        'text': '一企一档',
        'icon': 'anticon-appstore',
        'children': [
          /*园区管理员操作菜单*/
          {
            'text': '企业信息列表',
            'link': '/hazard/basic-info/basic-info',
            'acl': [RoleEnum[RoleEnum.ParkManage], RoleEnum[RoleEnum.SafeMonitor]],
          },
          /*企业管理员操作菜单*/
          {
            'text': '基本信息',
            'link': '/hazard/basic-info/enterprise-basic-info',
            'acl': RoleEnum[RoleEnum.Enterprise],
          },
          {
            'text': '证照信息',
            'link': '/hazard/basic-info/certificate-info',
            'acl': RoleEnum[RoleEnum.Enterprise],
          },/*以上的2个菜单展现形式未确定还未创建模板文件*/
          {
            'text': '周边环境',
            'link': '/hazard/basic-info/enterprise-surrounding-info-list',
            'acl': RoleEnum[RoleEnum.Enterprise],
          },
          {
            'text': '生产原料',
            'link': '/hazard/basic-info/production-materials-info-list',
            'acl': RoleEnum[RoleEnum.Enterprise],
          },
          {
            'text': '中间产品',
            'link': '/hazard/basic-info/intermediate-product-info-list',
            'acl': RoleEnum[RoleEnum.Enterprise],
          },
          {
            'text': '最终产品',
            'link': '/hazard/basic-info/final-product-info-list',
            'acl': RoleEnum[RoleEnum.Enterprise],
          },
          {
            'text': '生产装置',
            'link': '/hazard/basic-info/production-device-info-list',
            'acl': RoleEnum[RoleEnum.Enterprise],
          },
          {
            'text': '审核列表',
            'link': '/hazard/basic-info/basic-info-audit-list',
          },
          {
            'text': '企业信息统计',
            'link': '/hazard/basic-info/basic-info-statistics',
            'acl': [RoleEnum[RoleEnum.ParkManage], RoleEnum[RoleEnum.SafeMonitor]],
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
            'link': '/hazard/key-supervision-management/key-hazardous-chemicals-list',
          },
          {
            'text': '重点监管危险化工工艺列表',
            'link': '/hazard/key-supervision-management/hazardous-chemical-processes-list',
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
            'acl': RoleEnum[RoleEnum.Enterprise],
            get link() {
              if (window.sessionStorage.getItem(EVENT_KEY.role) === RoleEnum[RoleEnum.Enterprise]) {
                return '/hazard/storage-tank-management/tank-list';
              } else {
                return '/hazard/storage-tank-management/tank-list1';
              }
            },
          },
          {
            'text': '库房列表',
            'acl': RoleEnum[RoleEnum.Enterprise],
            get link() {
              if (window.sessionStorage.getItem(EVENT_KEY.role) === RoleEnum[RoleEnum.Enterprise]) {
                return '/hazard/warehouse-management/warehouse-list';
              } else {
                return '/hazard/warehouse-management/warehouse-list1';
              }
            },
          },
          {
            'text': '生产场所列表',
            'acl': RoleEnum[RoleEnum.Enterprise],
            get link() {
              if (window.sessionStorage.getItem(EVENT_KEY.role) === RoleEnum[RoleEnum.Enterprise]) {
                return '/hazard/production-management/production-list';
              } else {
                return '/hazard/production-management/production-list1';
              }
            },
          },

          {
            'text': '重大危险源列表',
            'link': '/hazard/major-hazard-management/major-hazard-list',
          },
    /*      {
            'text': '重大危险源列表',
            'acl': RoleEnum[RoleEnum.Enterprise],
            get link() {
              if (window.sessionStorage.getItem(EVENT_KEY.role) === RoleEnum[RoleEnum.Enterprise]) {
                return '/hazard/major-hazard-management/major-hazard-list';
              } else {
                return '/hazard/major-hazard-management/major-hazard-list1';
              }
            },
          },*/
          {
            'text': '重大危险源备案列表 ',
            'link': '/hazard/major-hazard-management/major-hazard-record-list',
          },
          {
            'text': '重大危险源统计',
            'link': '/hazard/major-hazard-management/major-hazard-statistics-list',
            'acl': [RoleEnum[RoleEnum.ParkManage], RoleEnum[RoleEnum.SafeMonitor]],
          },
        ],
      },
    ],
  },
  {
    text: '储罐管理',
    group: false,
    hideInBreadcrumb: false,
    'acl': [RoleEnum[RoleEnum.ParkManage], RoleEnum[RoleEnum.SafeMonitor]],
    children: [
      {
        'text': '储罐管理',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '储罐列表',
            'acl': [RoleEnum[RoleEnum.ParkManage], RoleEnum[RoleEnum.SafeMonitor]],
            get link() {
              const role=window.sessionStorage.getItem(EVENT_KEY.role);
              if (role === RoleEnum[RoleEnum.ParkManage]||role === RoleEnum[RoleEnum.SafeMonitor]) {
                return '/hazard/storage-tank-management/tank-list';
              } else {
                return '/hazard/storage-tank-management/tank-list1';
              }
            },
          },
        ],
      },
    ],
  },
  {
    text: '库房管理',
    group: false,
    hideInBreadcrumb: false,
    'acl': [RoleEnum[RoleEnum.ParkManage], RoleEnum[RoleEnum.SafeMonitor]],
    children: [
      {
        'text': '库房管理',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '库房列表',
            'acl': [RoleEnum[RoleEnum.ParkManage], RoleEnum[RoleEnum.SafeMonitor]],
            get link() {
              const role=window.sessionStorage.getItem(EVENT_KEY.role);
              if (role === RoleEnum[RoleEnum.ParkManage]||role === RoleEnum[RoleEnum.SafeMonitor]) {
                return '/hazard/warehouse-management/warehouse-list';
              } else {
                return '/hazard/warehouse-management/warehouse-list1';
              }
            },
          },
        ],
      },
    ],
  },
  {
    text: '生产场所管理',
    group: false,
    hideInBreadcrumb: false,
    'acl': [RoleEnum[RoleEnum.ParkManage], RoleEnum[RoleEnum.SafeMonitor]],
    children: [
      {
        'text': '生产场所管理',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '生产场所列表',
            'acl':[RoleEnum[RoleEnum.ParkManage], RoleEnum[RoleEnum.SafeMonitor]],
            get link() {
              const role=window.sessionStorage.getItem(EVENT_KEY.role);
              if (role === RoleEnum[RoleEnum.ParkManage]||role === RoleEnum[RoleEnum.SafeMonitor]) {
                return '/hazard/production-management/production-list';
              } else {
                return '/hazard/production-management/production-list1';
              }
            },
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
            'link': '/hazard/sensor-management/sensor-list',
          },
          {
            'text': '传感器数据',
            'link': '/hazard/sensor-management/sensor-data',
          },
          /*         {
                     'text': '传感器实时数据',
                     'link': '/sensor-management/sensor-realtime-data-list',
                   },
                   {
                     'text': '传感器历史数据',
                     'link': '/sensor-management/sensor-history-data-list',
                   },*/
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
            'link': '/hazard/camera-management/camera-list',
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
            'link': '/hazard/alarm-management/realtime-alarm-list',
          },
          {
            'text': '历史报警',
            'link': '/hazard/alarm-management/historical-alarm-list',
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
            'link': '/hazard/special-operation-management/hot-work-list',
          },
          {
            'text': '受限空间作业',
            'link': '/hazard/special-operation-management/confined-space-work-list',
          },
          {
            'text': '高处作业',
            'link': '/hazard/special-operation-management/elevated-work-list',
          },
          {
            'text': '吊装作业',
            'link': '/hazard/special-operation-management/hoisting-operation-list',
          },
          {
            'text': '临时用电',
            'link': '/hazard/special-operation-management/temporary-electricity-list',
          },
          {
            'text': '设备检修',
            'link': '/hazard/special-operation-management/equipment-overhaul-list',
          },
          {
            'text': '盲板抽堵',
            'link': '/hazard/special-operation-management/blind-plate-list',
          },
          {
            'text': '断路作业',
            'link': '/hazard/special-operation-management/open-circuit-list',
          },
          {
            'text': '动土作业',
            'link': '/hazard/special-operation-management/earth-moving-list',
          },
        ],
      },
    ],
  },
];
