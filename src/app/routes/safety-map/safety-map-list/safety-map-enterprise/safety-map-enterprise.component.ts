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
import {
  EnterpriseBasicInfoService,
  EnterpriseBasicInfoServiceNs,
} from '@core/biz-services/basic-info/enterprise-basic-info.service';
import EnterpriseInfoModel = EnterpriseBasicInfoServiceNs.EnterpriseInfoModel;
import { webSocketIp } from '@env/environment';
import WebSocketTypeEnum = SafetyMapServiceNs.WebSocketTypeEnum;
import HazardDatas = EnterpriseBasicInfoServiceNs.HazardDatas;

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
  hazardedId: number;
  selectedCameraId: number;
  selectedTempId: number;
  selectedPressId: number;
  selectedWaterLevelId: number;
  selectedFireGasId: number;
  selectedPoisonId: number;
  currentRole: string;
  roleEnum = RoleEnum;
  @Input() enterpriseId: number;
  @Input() enterprisePosition: LatitudeLongitudeModel;
  @Output() returnBackBtn: EventEmitter<any>;
  enterpriseInfo: EnterpriseInfoModel;
  hazardDataNums: HazardDatas; // 存储所有标识数量的数组
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

  ws: WebSocket;//定义websocket
  constructor(private cdr: ChangeDetectorRef, private safetyMapService: SafetyMapService, private enterpriseBasicInfoService: EnterpriseBasicInfoService) {
    this.selectedCameraId = -1;
    this.hazardedId = -1;
    this.selectedTempId = -1;
    this.selectedPressId = -1;
    this.selectedWaterLevelId = -1;
    this.selectedFireGasId = -1;
    this.selectedPoisonId = -1;
    this.currentRole = RoleEnum[RoleEnum.ParkManage];
    const imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?' +
      'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
      '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a65163e2ebdf5a37abb7f49274b85df';
    this.tilePhoto = new T.TileLayer(imageURL, { minZoom: 1, maxZoom: 18 });
    this.currentSelLayerBtnIndex = -1;
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
    this.hazardDataNums = {
      temp: 0,
      liquid: 0,
      camera: 0,
      alarm: 0,
      pressure: 0,
      poisonous: 0,
      hazardInfo: 0,
      combustible: 0,
      major: 0,
    };
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
            //console.log(item.id);
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
            this.hazardSourcesMarkerArray.push(this.painPolygon(polygonPoints, item.id));
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
          this.hazardedId = item.setOptions.id;
          //console.log(this.hazardId);
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
          this.selectedTempId = item.setOptions.id;
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
          this.selectedPressId = item.setOptions.id;
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
          this.selectedWaterLevelId = item.setOptions.id;
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
          this.selectedFireGasId = item.setOptions.id;
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
          this.selectedPoisonId = item.setOptions.id;
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
          this.selectedCameraId = item.setOptions.id;
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
  painPolygon(list, id) {
    const polygon = new T.Polygon(list, {
      color: 'red',
      weight: 3,
      opacity: 0.5,
      fillColor: '#FFFFFF',
      fillOpacity: 0.5,
    });
    polygon.setOptions = { id: id };
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
    this.enterpriseInfo.entprScope.forEach(({ lat, lng }) => {
      points.push(new T.LngLat(lng, lat));
    });
    const polygon = new T.Polygon(points, {
      color: 'blue', weight: 3, opacity: 0.5, fillColor: '#FFFFFF', fillOpacity: 0,
    });
    this.map.addOverLay(polygon);
  }

  // 获取企业详情
  async getEnterpriseInfo() {
    this.enterpriseInfo = await this.enterpriseBasicInfoService.getEnterpriseInfoDetail({ entprId: this.enterpriseId });
    this.hazardDataNums.alarm = this.enterpriseInfo.safeOneMapDataNumDTO.alarm;
    this.hazardDataNums.temp = this.enterpriseInfo.safeOneMapDataNumDTO.temp;
    this.hazardDataNums.pressure = this.enterpriseInfo.safeOneMapDataNumDTO.pressure;
    this.hazardDataNums.liquid = this.enterpriseInfo.safeOneMapDataNumDTO.liquid;
    this.hazardDataNums.combustible = this.enterpriseInfo.safeOneMapDataNumDTO.combustible;
    this.hazardDataNums.poisonous = this.enterpriseInfo.safeOneMapDataNumDTO.poisonous;
    this.hazardDataNums.camera = this.enterpriseInfo.safeOneMapDataNumDTO.camera;
    this.hazardDataNums.major = this.enterpriseInfo.safeOneMapDataNumDTO.major;
  }

  // 开启websocket
  connectWs() {
    if (this.ws != null) {
      this.ws.close();
    }
    this.ws = new WebSocket(`ws://${webSocketIp}:8081/websocket/${WebSocketTypeEnum.NormaL}`);
    this.ws.onopen = (e) => {
      //socket 开启后执行，可以向后端传递信息
      // this.ws.send('sonmething');

    };
    this.ws.onmessage = (e) => {
      //socket 获取后端传递到前端的信息
      // this.ws.send('sonmething');
      if (e.data !== '-连接已建立-') {
        const tempArray = JSON.parse(e.data);
        this.hazardDataNums = (tempArray as any[]).filter((item) => {
          return item.entprId === this.enterpriseId;
        })[0];
        this.initIdentificationObj();
        this.cdr.markForCheck();
      }
    };
    this.ws.onerror = (e) => {
      //socket error信息
      console.log(e);

    };
    this.ws.onclose = (e) => {
      //socket 关闭后执行
      console.log(e);
    };
  }

  // 初始化标识对象和图层对象
  initIdentificationObj() {
    this.identificationBtnObjArray = [
      {
        name: '实时报警',
        type: 'default',
        icon: 'bell',
        isSel: false,
        layNum: LayerEnum.Alarm,
        count: this.hazardDataNums.alarm,
      },
      {
        name: '温度传感器',
        type: 'default',
        icon: 'temperature',
        isSel: false,
        layNum: LayerEnum.Temperature,
        count: this.hazardDataNums.temp,
      },
      {
        name: '压力传感器',
        type: 'default',
        icon: 'pressure',
        isSel: false,
        layNum: LayerEnum.Pressure,
        count: this.hazardDataNums.pressure,
      },
      {
        name: '液位传感器',
        type: 'default',
        icon: 'water-level',
        isSel: false,
        layNum: LayerEnum.WaterLevel,
        count: this.hazardDataNums.liquid,
      },
      {
        name: '可燃气体',
        type: 'default',
        icon: 'fire',
        isSel: false,
        layNum: LayerEnum.FireGas,
        count: this.hazardDataNums.combustible,
      },
      {
        name: '有毒气体',
        type: 'default',
        icon: 'poison',
        isSel: false,
        layNum: LayerEnum.PoisonousGas,
        count: this.hazardDataNums.poisonous,
      },
      {
        name: '摄像头',
        type: 'default',
        icon: 'camera',
        isSel: false,
        layNum: LayerEnum.Camera,
        count: this.hazardDataNums.camera,
      },
    ];
    this.layerObjArray = [
      {
        name: '重大危险源',
        type: 'default',
        icon: 'warning',
        isSel: false,
        layNum: LayerEnum.HazardSources,
        count: this.hazardDataNums.major,
      },
    ];
  }

  async ngOnInit() {
    this.currentRole = window.sessionStorage.getItem(EVENT_KEY.role);
  }

  async ngAfterViewInit() {
    this.initMap();
    await this.getEnterpriseInfo();
    this.initIdentificationObj();
    this.connectWs();
    // 初始化企业范围
    this.initEnterpriseArea();


    this.cdr.markForCheck();
  }

}
