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
          /*园区管理员操作菜单*/
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
          /*企业管理员操作菜单*/
          {
            'text': '企业基本信息',
            'link': '/basic-info/basic-info-list',
            'acl': RoleEnum[RoleEnum.Enterprise],
          },
          {
            'text': '证照信息',
            'link': '/basic-info/certificate-info-list',
            'acl': RoleEnum[RoleEnum.Enterprise],
          },/*以上的2个菜单展现形式未确定还未创建模板文件*/
          {
            'text': '企业周边环境信息',
            'link': '/basic-info/enterprise-surrounding-info-list',
            'acl': RoleEnum[RoleEnum.Enterprise],
          },
          {
            'text': '生产原料信息',
            'link': '/basic-info/production-materials-info-list',
            'acl': RoleEnum[RoleEnum.Enterprise],
          },
          {
            'text': '中间产品信息',
            'link': '/basic-info/intermediate-product-info-list',
            'acl': RoleEnum[RoleEnum.Enterprise],
          },
          {
            'text': '最终产品信息',
            'link': '/basic-info/final-product-info-list',
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
            'acl': RoleEnum[RoleEnum.Enterprise],
            get link() {
              if (window.sessionStorage.getItem(EVENT_KEY.role) === RoleEnum[RoleEnum.Enterprise]) {
                return '/storage-tank-management/tank-list';
              } else {
                return '/storage-tank-management/tank-list1';
              }
            },
          },
          {
            'text': '库房列表',
            'acl': RoleEnum[RoleEnum.Enterprise],
            get link() {
              if (window.sessionStorage.getItem(EVENT_KEY.role) === RoleEnum[RoleEnum.Enterprise]) {
                return '/warehouse-management/warehouse-list';
              } else {
                return '/warehouse-management/warehouse-list1';
              }
            },
          },
          {
            'text': '生产场所列表',
            'acl': RoleEnum[RoleEnum.Enterprise],
            get link() {
              if (window.sessionStorage.getItem(EVENT_KEY.role) === RoleEnum[RoleEnum.Enterprise]) {
                return '/production-management/production-list';
              } else {
                return '/production-management/production-list1';
              }
            },
          },

          {
            'text': '重大危险源列表',
            'acl': RoleEnum[RoleEnum.Enterprise],
             get link() {
              if (window.sessionStorage.getItem(EVENT_KEY.role) === RoleEnum[RoleEnum.Enterprise]) {
                return '/major-hazard-management/major-hazard-list';
              } else {
                return '/major-hazard-management/major-hazard-list1';
              }
            },
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
            'acl': RoleEnum[RoleEnum.ParkManage],
            get link() {
              if (window.sessionStorage.getItem(EVENT_KEY.role) === RoleEnum[RoleEnum.ParkManage]) {
                return '/storage-tank-management/tank-list';
              } else {
                return '/storage-tank-management/tank-list1';
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
    'acl': RoleEnum[RoleEnum.ParkManage],
    children: [
      {
        'text': '库房管理',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '库房列表',
            'acl': RoleEnum[RoleEnum.ParkManage],
            get link() {
              if (window.sessionStorage.getItem(EVENT_KEY.role) === RoleEnum[RoleEnum.ParkManage]) {
                return '/warehouse-management/warehouse-list';
              } else {
                return '/warehouse-management/warehouse-list1';
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
    'acl': RoleEnum[RoleEnum.ParkManage],
    children: [
      {
        'text': '生产场所管理',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '生产场所列表',
            'acl': RoleEnum[RoleEnum.ParkManage],
            get link() {
              if (window.sessionStorage.getItem(EVENT_KEY.role) === RoleEnum[RoleEnum.ParkManage]) {
                return '/production-management/production-list';
              } else {
                return '/production-management/production-list1';
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
            'link': '/sensor-management/sensor-list',
          },
          {
            'text': '传感器实时数据',
            'link': '/sensor-management/sensor-realtime-data-list',
          },
          {
            'text': '传感器历史数据',
            'link': '/sensor-management/sensor-history-data-list',
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
            'link': '/camera-management/camera-list',
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
            'link': '/alarm-management/realtime-alarm-list',
          },
          {
            'text': '历史报警',
            'link': '/alarm-management/historical-alarm-list',
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
            'link': '/special-operation-management/hot-work-list',
          },
          {
            'text': '受限空间作业',
            'link': '/special-operation-management/confined-space-work-list',
          },
          {
            'text': '高处作业',
            'link': '/special-operation-management/elevated-work-list',
          },
          {
            'text': '吊装作业',
            'link': '/special-operation-management/hoisting-operation-list',
          },
          {
            'text': '临时用电',
            'link': '/special-operation-management/temporary-electricity-list',
          },
          {
            'text': '设备检修',
            'link': '/special-operation-management/equipment-overhaul-list',
          },
          {
            'text': '盲板抽堵',
            'link': '/special-operation-management/blind-plate-list',
          },
          {
            'text': '断路作业',
            'link': '/special-operation-management/open-circuit-list',
          },
          {
            'text': '动土作业',
            'link': '/special-operation-management/earth-moving-list',
          },
        ],
      },
    ],
  },
];
