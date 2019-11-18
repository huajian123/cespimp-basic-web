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

@Component({
  selector: 'app-position-picker-history-track',
  templateUrl: './position-picker-history-track.component.html',
  styleUrls: ['./position-picker-history-track.component.scss']
})
export class PositionPickerHistoryTrackComponent extends BaseConfirmModal.BasicConfirmModalComponent<any> implements OnInit, AfterViewInit {
  map;
  zoom: number;
  center: PositionModel;
  rectTool;
  @ViewChild('mapDivModal', {static: true}) mapElement: ElementRef;
  currentPosition: PositionModel;
  entprBasicInfo:LoginEntprModel;
  params;
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
    return;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.map = new T.Map(this.mapElement.nativeElement);
      // 设置显示地图的中心点和级别
      this.map.centerAndZoom(new T.LngLat(this.center.longitude, this.center.latitude),  this.entprBasicInfo.zoom||18);
      const point = [];
      this.params.forEach(({longitude, latitude}) => {
        point.push(new T.LngLat(longitude, latitude));
      });
      const line = new T.Polyline(point);
      this.map.addOverLay(line);

      let imageURL = '';
      imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?' +
        'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
        '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a65163e2ebdf5a37abb7f49274b85df';

      // 创建自定义图层对象
      const tilePhoto = new T.TileLayer(imageURL, {minZoom: 5, maxZoom: 18});
      this.map.addLayer(tilePhoto);
    }, 0);
  }
}
