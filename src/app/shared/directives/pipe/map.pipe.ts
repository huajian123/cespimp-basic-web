import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

export enum DateFormat {
  Date = 'yyyy-MM-dd',
  DateHour = 'yyyy-MM-dd HH',
  DateTime = 'yyyy-MM-dd HH:mm',
}

export enum MapKeyType {
  String,
  Number,
  Boolean
}

export const MapSet = {
  fireLevel: {
    1: '轻危险级',
    2: '中危险级',
    3: '严重危险级',
    4: '仓库危险级',
  },
  // 标准化等级
  standLevel: {
    1: '一级',
    2: '二级',
    3: '三级',
  },
  // 安全监管等级
  safetySupervisionLevel: {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: '未定级',
  },
  // 区划代码
  region: {
    1: '市辖区',
    2: '虎丘区',
    3: '吴中区',
    4: '姑苏区',
    5: '吴江区',
    6: '苏州工业园区',
    7: '常熟市',
    8: '张家港市',
    9: '昆山市',
    10: '太仓市',
  },
  tankType: {
    1: '常压储罐',
    2: '低压储罐',
    3: '压力储罐',
    4: '全压力式储罐',
    5: '半冷冻式、全冷冻式储罐',
  },
  // 储罐形式
  tankForm: {
    1: '立式',
    2: '卧式',
    3: '球形',
  },
  // 传感器类型
  sensorType: {
    1: '温度传感器',
    2: '压力传感器',
    3: '液位传感器',
    4: '有毒气体传感器',
    5: '可燃气体传感器',
  },
  // 储罐材质
  tankMate: {
    1: '碳钢',
    2: '不锈钢',
    3: '有色金属',
    4: '聚乙烯',
    5: '聚丙烯',
    6: '玻璃钢',
    7: '陶瓷',
    8: '橡胶',
    99: '其他',
  },
  // 特种作业类型
  operationType: {
    1: '动火作业',
    2: '受限空间作业',
    3: '高处作业',
    4: '吊装作业',
    5: '临时用电',
    6: '设备检修',
    7: '盲板抽堵',
    8: '断路作业',
    9: '动土作业',
  },
  // 危险源组成
  partType: {
    1: '储罐',
    2: '库房',
    3: '生产场所',
  },
  // 储罐结构
  tankStructure: {
    1: '拱顶式',
    2: '浮顶式',
    3: '内浮顶',
    4: '卧式',
  },
  // 设备类型
  equipmentType: {
    1: '常压储罐',
    2: '低压储罐',
    3: '压力储罐',
    4: '全压力式储罐',
    5: '半冷冻式、全冷冻式储罐',
    6: '气柜',
    7: '库区',
  },

  // 库房形式
  roomForm: {
    1: '封闭式',
    2: '半封闭式',
    3: '露天',
  },


  // 常压储罐
  atmosphericPressureType: {
    3: '罐内介质液位',
    1: '罐内介质温度',
    4: '罐内可燃气体浓度',
    5: '罐内有毒气体浓度',
  },

  // 低压储罐
  lowPressureType: {
    3: '罐内介质液位',
    2: '罐内介质压力',
    1: '罐内介质温度',
    4: '罐内可燃气体浓度',
    5: '罐内有毒气体浓度',
  },

  // 压力储罐
  pressureType: {
    3: '罐内介质液位',
    2: '罐内介质压力',
    1: '罐内介质温度',
    4: '罐内可燃气体浓度',
    5: '罐内有毒气体浓度',
  },

  // 全压力式储罐
  fullPressureTankType: {
    3: '罐内介质液位',
    2: '罐内介质压力',
    1: '罐内介质温度',
    4: '罐内可燃气体浓度',
    5: '罐内有毒气体浓度',
  },

  // 半冷冻式、全冷冻式储罐
  freezingTankType: {
    3: '罐内介质液位',
    2: '罐内介质压力',
    1: '罐内介质温度',
    4: '罐内可燃气体浓度',
    5: '罐内有毒气体浓度',
  },


  // 半冷冻式、全冷冻式储罐
  gasTankType: {
    10: '气柜柜容',
    11: '气柜压力',
    12: '气柜周边可燃气体浓度',
    13: '气柜周边有毒气体浓度',
  },

  // 库区
  reservoirAreaType: {
    6: '可燃气体浓度',
    7: '有毒气体浓度',
    8: '库房内温度',
    9: '库房内湿度',
  },

  // 有无
  hasOrNoType: {
    false: '无',
    true: '有',
  },

  // 是否
  isOrNoType: {
    false: '否',
    true: '是',
  },

  // 是否构成
  isDangerSourceType: {
    false: '不构成',
    true: '构成',
  },

  // 危险源类型
  dangerSourceType: {
    1: '储罐',
    2: '高危工艺',
    3: '可燃气体浓度',
    4: '有毒气体浓度',
  },

  //  重大危险等级
  majorHazardLevel: {
    1: '一级',
    2: '二级',
    3: '三级',
    4: '四级',
  },
  //  重大危险等级
  majorHazardNature: {
    1: '易燃',
    2: '有毒',
    3: '兼有易燃有毒',
  },
  //  危险等级
  riskLevel: {
    1: '重大风险',
    2: '较大风险',
    3: '一般风险',
    4: '低风险',
  },
  //  危险等级
  twoThreeType: {
    1: '安全风险分级管控清单',
    2: '危险有害因素排查清单',
    3: '承诺卡',
    4: '应急卡',
    5: '应知卡',
  },
  noticeType: {
    1: '公告',
    2: '行业动态发布',
    3: '文件通知',
    4: '园区介绍',
  },

  // 出入类型
  comeGoType: {
    1: '入',
    2: '出',
  },

  // 出入类型
  personType: {
    1: '员工',
    2: '临时员工',
    3: '外协人员',
  },

  // 性别
  sexType: {
    1: '男',
    2: '女',
  },

  // 性别
  personCardType: {
    1: '员工卡',
    2: '临时卡',
  },

//  报警类型
  alarmType: {
    1: '温度报警',
    2: '压力报警',
    3: '液位报警',
    4: '可燃气体浓度报警',
    5: '有毒气体浓度报警',
  },

  //  报警状态
  alarmStatus: {
    1: '待处理',
    2: '已处理',
  },
  //  经营状态
  operatingStatus: {
    1: '营业',
    2: '停业',
    3: '筹建',
    4: '关闭',
    5: '破产',
    99: '其他',
  },

  // 经济类型
  ecoType: {
    1: '股份制',
    2: '外商投资',
    3: '港澳台投资',
    4: '私营经济',
    5: '集体经济',
    6: '个体经济',
    7: '国有经济',
    8: '联营经济',
    99: '其他',
  },
  // 企业规模
  entprScale: {
    1: '大型',
    2: '中型',
    3: '小型',
  },
  // 单元类型
  unitType: {
    1: '生产单元',
    2: '存储单元',
  },
  //  待审核状态
  reviewStatus: {
    1: '待审核',
    2: '审核不通过',
    3: '审核通过',
  },

  // 周边环境类型
  envrType: {
    1: '住宅区',
    2: '生产单位',
    3: '机关团体',
    4: '公共场所',
    5: '交通要道',
    99: '其他',
  },

  // 周边环境方位
  envrDirection: {
    1: '东',
    2: '西',
    3: '南',
    4: '北',
    5: '东南',
    6: '西南',
    7: '东北',
    8: '西北',
  },

  // 建筑结构
  buildStruct: {
    1: '混合结构',
    2: '框架结构',
    3: '框架剪力墙结构',
    4: '剪力墙结构',
    5: '框筒结构',
    6: '筒中筒结构',
    7: '钢架网、悬索结构',
    99: '其他',
  },
  // 危险化工工艺
  processType: {
    1: '光气及光气化工艺',
    2: '电解工艺（氯碱）',
    3: '氯化工艺',
    4: '硝化工艺',
    5: '合成氨工艺',
    6: '裂解（裂化）工艺',
    7: '氟化工艺',
    8: '加氢工艺',
    9: '重氮化工艺',
    10: '氧化工艺',
    11: '过氧化工艺',
    12: '氨基化工艺',
    13: '磺化工艺',
    14: '聚合工艺',
    15: '烷基化工艺',
    16: '新型煤化工工艺',
    17: '电石生产工艺',
    18: '偶氮化工艺',
  },
  // 建筑结构
  productType: {
    1: '生产原料',
    2: '中间产品',
    3: '最终产品',
  },

  // 空气质量
  airQualityStatus: {
    1: '优',
    2: '良',
    3: '轻度污染',
    4: '中度污染',
    5: '重度污染',
    6: '严重污染',
  },

  // 传感器状态值
  sensorInfoStatus: {
    0: '正常',
    1: '一级',
    2: '二级',
    3: '三级',
    4: '四级',
  },
};

export interface MapItem {
  label: string;
  value: any;
}

@Pipe({
  name: 'map',
})
export class MapPipe implements PipeTransform {
  private datePipe: DatePipe = new DatePipe('en-US');
  private mapObj = MapSet;

  static transformMapToArray(data: any, mapKeyType: MapKeyType = MapKeyType.Number): MapItem[] {
    return Object.keys(data || {}).map(key => {
      let value: any;
      switch (mapKeyType) {
        case MapKeyType.Number:
          value = Number(key);
          break;
        case MapKeyType.Boolean:
          value = key === 'true';
          break;
        case MapKeyType.String:
        default:
          value = key;
          break;
      }
      return { value, label: data[key] };
    });
  }

  transform(value: any, arg?: any): any {
    if (arg === undefined) {
      return value;
    }
    let type: string = arg;
    let param = '';

    if (arg.indexOf(':') !== -1) {
      type = arg.substring(0, arg.indexOf(':'));
      param = arg.substring(arg.indexOf(':') + 1, arg.length);
    }

    switch (type) {
      case 'date':
        return this.datePipe.transform(value, param);
      default:
        return (this.mapObj[type] ? this.mapObj[type][value] : '');
    }
  }
}
