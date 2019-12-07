import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SafetyMapService, SafetyMapServiceNs } from '@core/biz-services/safety-map/safety-map.service';
import IdentificationDataModel = SafetyMapServiceNs.IdentificationDataModel;
import LatitudeLongitudeModel = SafetyMapServiceNs.LatitudeLongitudeModel;
import { RoleEnum } from '@core/vo/comm/BusinessEnum';
import { EVENT_KEY } from '@env/staticVariable';
import { EnterpriseBasicInfoServiceNs } from '@core/biz-services/basic-info/enterprise-basic-info.service';
import EnterpriseInfoModel = EnterpriseBasicInfoServiceNs.EnterpriseInfoModel;

enum IdentificationUrlEnum {
  FireNormal = '../../../../../assets/imgs/safeOnePage/fire.png',
  FireSel = '../../../../../assets/imgs/safeOnePage/fire-sel.png',
  CameraNormal = '../../../../../assets/imgs/safeOnePage/camera.png',
  CameraSel = '../../../../../assets/imgs/safeOnePage/camera-sel.png',
  TempNormal = '../../../../../assets/imgs/safeOnePage/temp.png',
  TempSel = '../../../../../assets/imgs/safeOnePage/temp-sel.png',
  WaterLevelNormal = '../../../../../assets/imgs/safeOnePage/water-level.png',
  WaterLevelSel = '../../../../../assets/imgs/safeOnePage/water-level-sel.png',
  PressNormal = '../../../../../assets/imgs/safeOnePage/press.png',
  PressSel = '../../../../../assets/imgs/safeOnePage/press-sel.png',
  PoisonNormal = '../../../../../assets/imgs/safeOnePage/poison.png',
  PoisonSel = '../../../../../assets/imgs/safeOnePage/poison-sel.png',
}

enum LayerEnum {
  HazardSources, // 重大危险源
  Alarm, // 告警
  Temperature, // 温度
  Pressure, // 压力
  WaterLevel, // 液位
  FireGas, // 可燃气体
  PoisonousGas, // 有毒气体
  Camera, // 摄像头
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
  currentRole: string;
  roleEnum = RoleEnum;
  @Input() enterpriseId: number;
  @Input() enterprisePosition: LatitudeLongitudeModel;
  @Output() returnBackBtn: EventEmitter<any>;
  @Input() enterpriseInfo: EnterpriseInfoModel;
  map;
  layerEnum = LayerEnum;
  tilePhoto: Object; // 倾斜摄影对象
  currentSelLayerBtnIndex: number;
  identificationBtnObjArray: LayerBtnInterface[]; // 标识图层数组

  hazardSourcesMarkerArray: any[]; // 重大危险源区域覆盖物存储数组
  temperatureMarkerArray: any[];// 温度
  pressureMarkerArray: any[];// 压力
  waterLevelMarkerArray: any[];// 液位
  fireGasMarkerArray: any[];// 可燃气体
  poisonousGasMarkerArray: any[];// 有毒气体
  cameraMarkerArray: any[];// 摄像头
  modelIsShow: {
    temp: boolean,
    press: boolean,
    waterLevel: boolean,
    fireGas: boolean,
    poisonousGas: boolean,
    camera: boolean,
    hazardSource: boolean,
  };

  layerObjArray: LayerBtnInterface[]; // 图层数组
  selLayerNumberArray: number[]; // 存储选中的图层的数组
  majorHazardCurrentSelLay: number;// 重大危险源当前选中的图层
  identificationData: IdentificationDataModel; // 重大危险源图层标识符数据集合


  constructor(private cdr: ChangeDetectorRef, private safetyMapService: SafetyMapService) {
    this.currentRole = RoleEnum[RoleEnum.ParkManage];
    const imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?' +
      'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
      '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a65163e2ebdf5a37abb7f49274b85df';
    this.tilePhoto = new T.TileLayer(imageURL, { minZoom: 1, maxZoom: 18 });
    this.currentSelLayerBtnIndex = -1;
    this.layerObjArray = [
      { name: '重大危险源', type: 'default', icon: 'warning', isSel: false, layNum: LayerEnum.HazardSources, count: 2 },
    ];

    this.identificationBtnObjArray = [
      { name: '实时报警', type: 'default', icon: 'bell', isSel: false, layNum: LayerEnum.Alarm, count: 2 },
      { name: '温度传感器', type: 'default', icon: 'temperature', isSel: false, layNum: LayerEnum.Temperature, count: 2 },
      { name: '压力传感器', type: 'default', icon: 'pressure', isSel: false, layNum: LayerEnum.Pressure, count: 2 },
      { name: '液位传感器', type: 'default', icon: 'water-level', isSel: false, layNum: LayerEnum.WaterLevel, count: 2 },
      { name: '可燃气体', type: 'default', icon: 'fire', isSel: false, layNum: LayerEnum.FireGas, count: 2 },
      { name: '有毒气体', type: 'default', icon: 'poison', isSel: false, layNum: LayerEnum.PoisonousGas, count: 2 },
      { name: '摄像头', type: 'default', icon: 'camera', isSel: false, layNum: LayerEnum.Camera, count: 2 },
    ];
    this.selLayerNumberArray = [];
    this.majorHazardCurrentSelLay = -1;
    this.identificationData = {};

    this.modelIsShow = {
      temp: false,
      press: false,
      waterLevel: false,
      fireGas: false,
      poisonousGas: false,
      camera: false,
      hazardSource: false,
    };
    // 初始化标注数组
    this.initIdentificationArray();
    this.returnBackBtn = new EventEmitter<any>();
  }

  // 选择标识
  async selIdentification(item) {
    item.isSel = !item.isSel;
    this.currentSelLayerBtnIndex = item.layNum;

    const index = this.selLayerNumberArray.indexOf(item.layNum);
    if (index === -1) {
      this.selLayerNumberArray.push(item.layNum);
    } else {
      this.selLayerNumberArray.splice(index, 1);
    }

    // 告警
    if (item.layNum === this.layerEnum.Alarm && item.isSel) {
      this.currentSelLayerBtnIndex = item.layNum;
    } else {
      this.currentSelLayerBtnIndex = -1;
      this.identificationBtnObjArray[0].isSel = false;
    }

    // 获取标识数据
    await this.getIdentificationData();

    this.map.clearOverLays();
    // 绘制厂区范围
    this.initEnterpriseArea();
    // 初始化标注数组
    this.initIdentificationArray();
    // 创建覆盖物标识
    Object.keys(this.identificationData).forEach(key => {
      this.identificationData[key].forEach(item => {
        switch (key) {
          // 温度
          case 'temp':
            const tempMarker = this.createMarkers(IdentificationUrlEnum.TempNormal, item.longitude, item.latitude, item.id);

            this.temperatureMarkerArray.push(tempMarker);
            this.map.addOverLay(tempMarker);
            break;
          // 液位
          case 'liquid':
            const liquidMarker = this.createMarkers(IdentificationUrlEnum.WaterLevelNormal, item.longitude, item.latitude, item.id);
            this.waterLevelMarkerArray.push(liquidMarker);
            this.map.addOverLay(liquidMarker);
            break;
          // 压力
          case 'pressure':
            const pressureMarker = this.createMarkers(IdentificationUrlEnum.PressNormal, item.longitude, item.latitude, item.id);
            this.pressureMarkerArray.push(pressureMarker);
            this.map.addOverLay(pressureMarker);
            break;
          // 摄像头
          case 'camera':
            const cameraMarker = this.createMarkers(IdentificationUrlEnum.CameraNormal, item.longitude, item.latitude, item.id);
            this.cameraMarkerArray.push(cameraMarker);
            this.map.addOverLay(cameraMarker);
            break;
          // 有毒气体
          case 'poisonous':
            const poisonousMarker = this.createMarkers(IdentificationUrlEnum.PoisonNormal, item.longitude, item.latitude, item.id);
            this.poisonousGasMarkerArray.push(poisonousMarker);
            this.map.addOverLay(poisonousMarker);
            break;
          // 可燃气体
          case 'combustible':
            const combustibleMarker = this.createMarkers(IdentificationUrlEnum.FireNormal, item.longitude, item.latitude, item.id);
            this.fireGasMarkerArray.push(combustibleMarker);
            this.map.addOverLay(combustibleMarker);
            break;
          // 重大危险源
          case 'majorHazardInfo':
            const polygonPoints = [];
            item.majorScope.forEach(({ lat, lng }) => {
              polygonPoints.push(new T.LngLat(lng, lat));
            });
            this.hazardSourcesMarkerArray.push(this.painPolygon(polygonPoints));
            break;
        }
      });
    });

    this.addMarkerListenFn();
  }

  // 初始化所有模态框状态
  initModelStatus() {
    Object.keys(this.modelIsShow).forEach(key => {
      this.modelIsShow[key] = false;
    });
  }

  // 覆盖物监听方法
  addMarkerListenFn() {
    this.hazardSourcesMarkerArray.forEach(item => {
      item.addEventListener('click', () => {
        setTimeout(() => {
          console.log('危险源覆盖物点击方法');
          this.currentSelLayerBtnIndex = this.layerEnum.HazardSources;
          this.initModelStatus();
          this.modelIsShow.hazardSource = true;
          this.cdr.markForCheck();
        }, 0);
      });
    });
    this.temperatureMarkerArray.forEach(item => {
      item.addEventListener('click', () => {
        setTimeout(() => {
          console.log('温度覆盖物点击方法');
          this.currentSelLayerBtnIndex = this.layerEnum.Temperature;
          this.initModelStatus();
          this.modelIsShow.temp = true;
          this.cdr.markForCheck();
        }, 0);
      });
    });
    this.pressureMarkerArray.forEach(item => {
      item.addEventListener('click', () => {
        setTimeout(() => {
          console.log('压力源覆盖物点击方法');
          this.currentSelLayerBtnIndex = this.layerEnum.Pressure;
          this.initModelStatus();
          this.modelIsShow.press = true;
          this.cdr.markForCheck();
        }, 0);
      });
    });
    this.waterLevelMarkerArray.forEach(item => {
      item.addEventListener('click', () => {
        setTimeout(() => {
          console.log('液位源覆盖物点击方法');
          this.currentSelLayerBtnIndex = this.layerEnum.WaterLevel;
          this.initModelStatus();
          this.modelIsShow.waterLevel = true;
          this.cdr.markForCheck();
        }, 0);
      });
    });
    this.fireGasMarkerArray.forEach(item => {
      item.addEventListener('click', () => {
        setTimeout(() => {
          console.log('可燃物覆盖物点击方法');
          this.currentSelLayerBtnIndex = this.layerEnum.FireGas;
          this.initModelStatus();
          this.modelIsShow.fireGas = true;
          this.cdr.markForCheck();
        }, 0);
      });
    });
    this.poisonousGasMarkerArray.forEach(item => {
      item.addEventListener('click', () => {
        setTimeout(() => {
          console.log('有毒覆盖物点击方法');
          this.currentSelLayerBtnIndex = this.layerEnum.PoisonousGas;
          this.initModelStatus();
          this.modelIsShow.poisonousGas = true;
          this.cdr.markForCheck();
        }, 0);
      });
    });
    this.cameraMarkerArray.forEach(item => {
      item.addEventListener('click', () => {
        setTimeout(() => {
          console.log('摄像头覆盖物点击方法');
          this.currentSelLayerBtnIndex = this.layerEnum.Camera;
          this.initModelStatus();
          this.modelIsShow.camera = true;
          this.cdr.markForCheck();
        }, 0);
      });
    });
  }

  initIdentificationArray() {
    this.hazardSourcesMarkerArray = []; // 重大危险源区域覆盖物存储数组
    this.temperatureMarkerArray = [];// 温度
    this.pressureMarkerArray = [];// 压力
    this.waterLevelMarkerArray = [];// 液位
    this.fireGasMarkerArray = [];// 可燃气体
    this.poisonousGasMarkerArray = [];// 有毒气体
    this.cameraMarkerArray = [];// 摄像头
  }

  // 绘制多边形
  painPolygon(list) {
    const polygon = new T.Polygon(list, {
      color: 'red',
      weight: 3,
      opacity: 0.5,
      fillColor: '#FFFFFF',
      fillOpacity: 0.5,
    });
    this.map.addOverLay(polygon);
    return polygon;
  }

  createMarkers(iconUrl: string, longitude: number, latitude: number, markId: number, type?) {
    const icon = new T.Icon({
      iconUrl,
      iconSize: new T.Point(27, 27),
      iconAnchor: new T.Point(10, 25),
    });
    const marker = new T.Marker(new T.LngLat(longitude, latitude), { icon });
    marker.setOptions = { id: markId, type: type || null };
    return marker;
  }

  // 点击重大危险源图层的标识，存储数据
  async getIdentificationData() {
    this.identificationData = await this.safetyMapService.getIdCardInfoDetail({
      entprId: this.enterpriseId,
      types: this.selLayerNumberArray,
    });
  }

  // 切换图层
  changeLayer(layerEnum, item) {
    item.isSel = !item.isSel;
    this.currentSelLayerBtnIndex = layerEnum;
    this.checkLayerNumberIsIndex(layerEnum);
  }

  checkLayerNumberIsIndex(layerEnum) {
    const index = this.selLayerNumberArray.indexOf(layerEnum);
    if (index === -1) {
      this.selLayerNumberArray.push(layerEnum);
    } else {
      this.selLayerNumberArray.splice(index, 1);
    }
  }

  initMap() {
    this.map = new T.Map('map');
    this.map.centerAndZoom(new T.LngLat(this.enterprisePosition.lng, this.enterprisePosition.lat), 18);
    this.map.addLayer(this.tilePhoto);
  }

  returnBack() {
    this.returnBackBtn.emit();
  }

  // 初始化企业范围
  initEnterpriseArea() {
    const points = [];
    if (!this.enterpriseInfo.entprScope) {
      const data = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.entprBasicInfo));
      this.enterpriseInfo.entprScope = JSON.parse(data.entprScope);
    }
    this.enterpriseInfo.entprScope.forEach(({ lat, lng }) => {
      points.push(new T.LngLat(lng, lat));
    });
    const polygon = new T.Polygon(points, {
      color: 'blue', weight: 3, opacity: 0.5, fillColor: '#FFFFFF', fillOpacity: 0,
    });
    this.map.addOverLay(polygon);
  }

  ngOnInit() {
    this.currentRole = window.sessionStorage.getItem(EVENT_KEY.role);
    console.log(this.enterpriseId);
    console.log(this.enterprisePosition);
    console.log(this.enterpriseInfo);
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.initEnterpriseArea();
  }

}
