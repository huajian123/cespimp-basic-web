import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {BaseConfirmModal} from '../base-confirm-modal';
import {EVENT_KEY} from '../../../environments/staticVariable';
import { LoginInfoModel } from '@core/vo/comm/BusinessEnum';
import { LoginServiceNs } from '@core/biz-services/login-services/login.service';
import LoginEntprModel = LoginServiceNs.LoginEntprModel;

interface PositionModel {
  longitude: number; // 经度
  latitude: number; // 纬度
}

// 位置对象
interface PositionModelObj {
  topLeft: PositionModel; // 左上角经纬度
  rightBottom: PositionModel; // 右下角经纬度
}

@Component({
  selector: 'app-position-picker-rect',
  templateUrl: './position-picker-rect.component.html',
  styleUrls: ['./position-picker-rect.component.scss']
})
export class PositionPickerRectComponent extends BaseConfirmModal.BasicConfirmModalComponent<any> implements AfterViewInit, OnInit {
  map;
  marker;
  zoom: number;
  center: PositionModel;
  rectTool;
  @ViewChild('mapDivModal', {static: true}) mapElement: ElementRef;
  currentPosition: PositionModel;
  currentSelRect: PositionModelObj;
  params;
  @Input() positionObj: PositionModelObj;
  entprBasicInfo:LoginEntprModel;
  loginInfo:LoginInfoModel;
  constructor() {
    super();
    this.zoom = 10;
    this.entprBasicInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.entprBasicInfo));
    console.log(this.entprBasicInfo);
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.currentPosition = {
      longitude:  this.entprBasicInfo.longitude,
      latitude:  this.entprBasicInfo.latitude
    };
    this.center = {
      longitude:  this.entprBasicInfo.longitude,
      latitude:  this.entprBasicInfo.latitude
    };
  }

  ngOnInit() {
  }

  protected getCurrentValue(): any {
    return this.getOverlays();
  }

  clean() {
    this.map.clearOverLays();
    this.rectTool.open();
  }

  // 获取覆盖物
  getOverlays() {
    const overlays = this.map.getOverlays();
    if (overlays.length === 0) {
      return null;
    }
    const {Lq, kq} = overlays[0].getBounds();
    this.currentSelRect.topLeft = Lq;
    this.currentSelRect.rightBottom = kq;
    return this.currentSelRect;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.map = new T.Map(this.mapElement.nativeElement);
      // 设置显示地图的中心点和级别
      this.map.centerAndZoom(new T.LngLat(this.center.longitude, this.center.latitude), this.entprBasicInfo.zoom||18);
      this.rectTool = new T.RectangleTool(this.map);

      let imageURL = '';
      imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?' +
        'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
        '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a65163e2ebdf5a37abb7f49274b85df';
      // 创建自定义图层对象
      const tilePhoto = new T.TileLayer(imageURL, {minZoom: 5, maxZoom: 18});
      this.map.addLayer(tilePhoto);

      // 已经画上了矩形框，则右上角或者左下角必须有坐标
      if (!(JSON.stringify(this.params.rightBottom) === '{}' && JSON.stringify(this.params.topLeft) === '{}')) {
        // 右下角 左上角
        const bounds = new T.LngLatBounds(
          new T.LngLat(this.params.rightBottom.longitude ? this.params.rightBottom.longitude : this.params.rightBottom.lng,
            this.params.rightBottom.latitude ? this.params.rightBottom.latitude : this.params.rightBottom.lat),
          new T.LngLat(this.params.topLeft.longitude ? this.params.topLeft.longitude : this.params.topLeft.lng,
            this.params.topLeft.latitude ? this.params.topLeft.latitude : this.params.topLeft.lat));
        const rect = new T.Rectangle(bounds);
        this.map.addOverLay(rect);
      } else {
        this.rectTool.open();
      }
    }, 0);
  }

}
