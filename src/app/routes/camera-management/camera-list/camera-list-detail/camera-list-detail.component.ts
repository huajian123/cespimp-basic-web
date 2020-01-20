import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output, ViewChild,
} from '@angular/core';
import {
  CameraManagementListInfoService,
  CameraManagementListServiceNs,
} from '@core/biz-services/camera-management/camera-list.service';
import CameraManagementListInfoModel = CameraManagementListServiceNs.CameraManagementListInfoModel;

@Component({
  selector: 'app-camera-management-camera-list-detail',
  templateUrl: './camera-list-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CameraManagementCameraListDetailComponent implements OnInit {
  @ViewChild('mapDivModal', { static: true }) mapElement: ElementRef;
  map;
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;
  dataInfo: CameraManagementListInfoModel;

  constructor(private dataService: CameraManagementListInfoService, private cdr: ChangeDetectorRef) {
    this.returnBack = new EventEmitter<any>();
    this.dataInfo = {
      id: null,
      cameraNo: '',
      cameraName: '',
      majorHazardId: null,
      majorHazardName: '',
      partName: '',
      partType: null,
      partId: null,
      longitude: null,
      latitude: null,
      locFactory: '',
    };
  }

  returnToList() {
    this.returnBack.emit({ refesh: false, pageNo: this.currentPageNum });
  }

  initMap(latitude, longitude) {
    setTimeout(() => {
      const zoom = 18;
      this.map = new T.Map(this.mapElement.nativeElement);
      // 设置显示地图的中心点和级别
      this.map.centerAndZoom(new T.LngLat(longitude, latitude), zoom);
      const imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?' +
        'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
        '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a65163e2ebdf5a37abb7f49274b85df';
      const tilePhoto = new T.TileLayer(imageURL, { minZoom: 1, maxZoom: 18 });
      this.map.addLayer(tilePhoto);
      const point = new T.LngLat(longitude, latitude);
      const marker = new T.Marker(point); // 创建标注
      this.map.addOverLay(marker);             // 将标注添加到地图中
      marker.enableDragging();
      this.initEnterpriseArea();
    });
  }

  async getDetailInfo() {
    this.dataInfo = await this.dataService.getCameraInfoDetail(this.id);
    this.initMap(this.dataInfo.latitude, this.dataInfo.longitude);
    this.cdr.markForCheck();
  }

  // 初始化企业范围
  initEnterpriseArea() {
    const points = [];
    this.dataInfo.entprScope.forEach(({ lat, lng }) => {
      points.push(new T.LngLat(lng, lat));
    });
    const polygon = new T.Polygon(points, {
      color: 'blue', weight: 3, opacity: 0.5, fillColor: '#FFFFFF', fillOpacity: 0,
    });
    this.map.addOverLay(polygon);
  }

  ngOnInit(): void {
    this.getDetailInfo();
  }

}
