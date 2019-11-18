import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BaseConfirmModal} from '../base-confirm-modal';
import {NzModalRef} from 'ng-zorro-antd';
import {EVENT_KEY} from '../../../environments/staticVariable';
import { LoginInfoModel } from '@core/vo/comm/BusinessEnum';
import { LoginServiceNs } from '@core/biz-services/login-services/login.service';
import LoginEntprModel = LoginServiceNs.LoginEntprModel;


interface PositionModel {
  longitude: number; // 经度
  latitude: number; // 纬度
}

@Component({
  selector: 'app-position-picker',
  templateUrl: './position-picker.component.html',
  styleUrls: ['./position-picker.component.scss']
})
export class PositionPickerComponent extends BaseConfirmModal.BasicConfirmModalComponent<any> implements AfterViewInit, OnInit {
  map;
  marker;
  zoom: number;
  center: PositionModel;
  @ViewChild('mapDivModal', {static: true}) mapElement: ElementRef;
  currentPosition: PositionModel;
  entprBasicInfo:LoginEntprModel;
  params;
  loginInfo:LoginInfoModel;

  constructor(private modalRef: NzModalRef) {
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
    return this.currentPosition;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.map = new T.Map(this.mapElement.nativeElement);
      // 设置显示地图的中心点和级别
      this.map.centerAndZoom(new T.LngLat(this.center.longitude, this.center.latitude), this.entprBasicInfo.zoom||18);
      if (this.params.isRemoteImage) {
        const imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?' +
          'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
          '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a65163e2ebdf5a37abb7f49274b85df';
        const tilePhoto = new T.TileLayer(imageURL, {minZoom: 1, maxZoom: 18});
        this.map.addLayer(tilePhoto);
      }


      const point = new T.LngLat(this.currentPosition.longitude, this.currentPosition.latitude);
      this.marker = new T.Marker(point); // 创建标注
      this.map.addOverLay(this.marker);             // 将标注添加到地图中
      this.marker.enableDragging();
      this.marker.addEventListener('mouseup', (type) => {
        this.currentPosition.latitude = type.lnglat.lat;
        this.currentPosition.longitude = type.lnglat.lng;
      });
    }, 0);
  }
}
