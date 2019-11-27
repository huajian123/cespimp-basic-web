import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BaseConfirmModal } from '../base-confirm-modal';
import { LoginServiceNs } from '@core/biz-services/login-services/login.service';
import LoginEntprModel = LoginServiceNs.LoginEntprModel;
import { NzModalRef } from 'ng-zorro-antd';
import { EVENT_KEY } from '@env/staticVariable';

interface PositionModel {
  longitude: number; // 经度
  latitude: number; // 纬度
}

@Component({
  selector: 'app-position-picker-rect',
  templateUrl: './position-picker-polygon.component.html',
  styleUrls: ['./position-picker-polygon.component.scss'],
})
export class PositionPickerPolygonComponent extends BaseConfirmModal.BasicConfirmModalComponent<any> implements AfterViewInit, OnInit {
  map;
  zoom: number;
  center: PositionModel;
  polygonTool; // 多边形工具对象
  polygon: any; // 多边形对象
  polygonPoints: any[];
  @ViewChild('mapDivModal', { static: true }) mapElement: ElementRef;
  currentPosition: PositionModel;
  params;
  entprBasicInfo: LoginEntprModel;
  canEdit: boolean;

  constructor(private cdr: ChangeDetectorRef, private nzModalRef: NzModalRef) {
    super();
    this.zoom = 10;
    this.entprBasicInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.entprBasicInfo));
    this.polygonPoints = [];
    this.polygon = {};
    this.canEdit = false;
  }

  protected getCurrentValue(): any {
    const obj = { value: this.polygonPoints };
    this.nzModalRef.close(obj);
  }

  public cancle() {
    this.nzModalRef.close();
  }

  // 编辑
  public edit() {
    this.canEdit = !this.canEdit;
    if (this.canEdit) {
      this.polygon.enableEdit();
      this.polygonPoints = [...this.polygon.getLngLats()[0]];

    } else {
      this.polygon.disableEdit();
      this.polygonPoints = [...this.polygon.getLngLats()[0]];
    }

  }

  // 绘制多边形
  painPolygon(list) {
    this.polygon = new T.Polygon(list, {
      color: 'blue',
      weight: 3,
      opacity: 0.5,
      fillColor: '#FFFFFF',
      fillOpacity: 0.5,
    });
    this.map.addOverLay(this.polygon);
  }

  // 重绘
  public repaint() {
    this.map.clearOverLays();
    this.polygonPoints.length = 0;
    this.polygonTool.open();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.map = new T.Map(this.mapElement.nativeElement);
      // 设置显示地图的中心点和级别
      this.map.centerAndZoom(new T.LngLat(this.center.longitude, this.center.latitude), this.entprBasicInfo.zoom || 18);
      const config = {
        showLabel: false,
        color: 'blue',
        weight: 3,
        opacity: 0.5,
        fillColor: '#FFFFFF',
        fillOpacity: 0.5,
        strokeOpacity: 0.5,  //折线的透明度，取值范围0 - 1
      };
      //创建测面工具对象
      this.polygonTool = new T.PolygonTool(this.map, config);

      // 监听绘制完成后的事件
      this.polygonTool.addEventListener('draw', (type) => {
        this.polygonTool.clear();
        this.polygonTool.close();
        this.canEdit = false;
        this.polygonPoints = [...type.currentLnglats];
        this.painPolygon(this.polygonPoints);
      });
      let imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?' +
        'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
        '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a65163e2ebdf5a37abb7f49274b85df';
      // 创建自定义图层对象
      const tilePhoto = new T.TileLayer(imageURL, { minZoom: 5, maxZoom: 18 });
      this.map.addLayer(tilePhoto);


      // 如果是编辑
      if (this.params.currentPolygonList.length > 0) {
        this.polygonPoints.length = 0;
        this.params.currentPolygonList.forEach(({ lat, lng }) => {
          this.polygonPoints.push(new T.LngLat(lng, lat));
        });
        this.painPolygon(this.polygonPoints);
      }
    }, 0);
  }

  ngOnInit() {
    this.currentPosition = {
      longitude: this.params.longitude || this.entprBasicInfo.longitude,
      latitude: this.params.latitude || this.entprBasicInfo.latitude,
    };
    this.center = {
      longitude: this.params.longitude || this.entprBasicInfo.longitude,
      latitude: this.params.latitude || this.entprBasicInfo.latitude,
    };
  }
}
