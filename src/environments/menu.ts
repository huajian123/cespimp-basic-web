export const menus = [
  {
    text: '基础信息',
    group: false,
    hideInBreadcrumb: false,
    children: [
      {
        'text': '基础信息',
        'icon': 'anticon-appstore',
        'children': [
          {
            'text': '仪表盘V1',
            'link': '/dashboard/v1',
          },
          {
            'text': '分析页',
            'link': '/dashboard/analysis',
          },
          {
            'text': '监控页',
            'link': '/dashboard/monitor',
          },
          {
            'text': '工作台',
            'link': '/dashboard/workplace',
          },
        ],
      },
    ],
  },

];
