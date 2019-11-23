import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BasicInfoService } from '@core/biz-services/basic-info/basic-info.service';

enum LayerEnum {
  Temperature,
  Pressure,
  WaterLevel,
  FireGas,
  PoisonousGas,
  Camera
}

interface LayerBtnInterface {
  name: string;
  type: string;
  icon: string;
  isSel: boolean;
}

@Component({
  selector: 'safety-map-enterprise',
  templateUrl: './safety-map-enterprise.component.html',
  styleUrls: ['./safety-map-enterprise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafetyMapEnterpriseComponent implements OnInit, AfterViewInit {
  map;
  layerEnum = LayerEnum;
  tilePhoto: Object; // 倾斜摄影对象
  currentSelLayerBtnIndex: number;
  layerBtnObjArray: LayerBtnInterface[];

  constructor(private cdr: ChangeDetectorRef) {
    const imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?' +
      'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
      '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a65163e2ebdf5a37abb7f49274b85df';
    this.tilePhoto = new T.TileLayer(imageURL, { minZoom: 1, maxZoom: 18 });
    this.currentSelLayerBtnIndex = -1;
    this.layerBtnObjArray = [
      { name: '温度传感器', type: 'default', icon: 'download', isSel: false },
      { name: '压力传感器', type: 'default', icon: 'download', isSel: false },
      { name: '液位传感器', type: 'default', icon: 'download', isSel: false },
      { name: '可燃气体', type: 'default', icon: 'download', isSel: false },
      { name: '有毒气体', type: 'default', icon: 'download', isSel: false },
      { name: '摄像头', type: 'default', icon: 'download', isSel: false },
    ];
  }

  // 切换图层
  changeLayer(layerEnum, item) {
    item.isSel = !item.isSel;
    this.currentSelLayerBtnIndex = layerEnum;

  }

  initMap() {
    this.map = new T.Map('map');
    this.map.centerAndZoom(new T.LngLat(118.30612, 34.29057), 18);
    this.map.addLayer(this.tilePhoto);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
