import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BasicInfoService } from '@core/biz-services/basic-info/basic-info.service';

enum LayerEnum {
  Alarm, // 告警
  Temperature, // 温度
  Pressure, // 压力
  WaterLevel, // 液位
  FireGas, // 可燃气体
  PoisonousGas, // 有毒气体
  Camera, // 摄像头
  HazardSources, // 重大危险源
}

interface LayerBtnInterface {
  name: string;
  type: string;
  icon: string;
  isSel: boolean;
  layNum: number;
  count: number;
}

@Component({
  selector: 'safety-map-enterprise',
  templateUrl: './safety-map-enterprise.component.html',
  styleUrls: ['./safety-map-enterprise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafetyMapEnterpriseComponent implements OnInit, AfterViewInit {
  @Input() enterpriseId: number;
  map;
  layerEnum = LayerEnum;
  tilePhoto: Object; // 倾斜摄影对象
  currentSelLayerBtnIndex: number;
  identificationBtnObjArray: LayerBtnInterface[]; // 标识图层数组
  layerObjArray:LayerBtnInterface[]; // 图层数组
  selLayerNumberArray: number[]; // 存储选中的图层的数组
// /safety-map/safety-map-list
  constructor(private cdr: ChangeDetectorRef) {
    const imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?' +
      'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
      '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a65163e2ebdf5a37abb7f49274b85df';
    this.tilePhoto = new T.TileLayer(imageURL, { minZoom: 1, maxZoom: 18 });
    this.currentSelLayerBtnIndex = -1;
    this.layerObjArray=[
      { name: '重大危险源', type: 'default', icon: 'warning', isSel: false, layNum: LayerEnum.HazardSources, count: 2 },
    ];

    this.identificationBtnObjArray = [
      { name: '实时报警', type: 'default', icon: 'bell', isSel: false, layNum: LayerEnum.Alarm, count: 2 },
      { name: '温度传感器', type: 'default', icon: 'temperature', isSel: false, layNum: LayerEnum.Temperature , count: 2 },
      { name: '压力传感器', type: 'default', icon: 'pressure', isSel: false, layNum: LayerEnum.Pressure, count: 2  },
      { name: '液位传感器', type: 'default', icon: 'water-level', isSel: false, layNum: LayerEnum.WaterLevel, count: 2  },
      { name: '可燃气体', type: 'default', icon: 'fire', isSel: false, layNum: LayerEnum.FireGas , count: 2 },
      { name: '有毒气体', type: 'default', icon: 'poison', isSel: false, layNum: LayerEnum.PoisonousGas, count: 2  },
      { name: '摄像头', type: 'default', icon: 'camera', isSel: false, layNum: LayerEnum.Camera , count: 2 },
    ];
    this.selLayerNumberArray = [];
  }

  // 选择标识
  selIdentification(item){
    item.isSel = !item.isSel;
    this.currentSelLayerBtnIndex = item.layNum;

    const index = this.selLayerNumberArray.indexOf(item.layNum);
    if (index === -1) {
      this.selLayerNumberArray.push(item.layNum);
    } else {
      this.selLayerNumberArray.splice(index, 1);
    }
    console.log(this.selLayerNumberArray);
  }

  // 切换图层
  changeLayer(layerEnum, item) {
    item.isSel = !item.isSel;
    this.currentSelLayerBtnIndex = layerEnum;
    this.checkLayerNumberIsIndex(layerEnum);
  }

  checkLayerNumberIsIndex(layerEnum){
    const index = this.selLayerNumberArray.indexOf(layerEnum);
    if (index === -1) {
      this.selLayerNumberArray.push(layerEnum);
    } else {
      this.selLayerNumberArray.splice(index, 1);
    }
  }

  // 创建覆盖物

  initMap() {
    this.map = new T.Map('map');
    this.map.centerAndZoom(new T.LngLat(118.30612, 34.29057), 18);
    this.map.addLayer(this.tilePhoto);
  }

  ngOnInit() {
    console.log(this.enterpriseId);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
