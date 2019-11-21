import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { loadModules } from 'esri-loader';
import esri = __esri;
import { environment } from '@env/environment';


@Component({
  selector: 'park-introduction-detail',
  templateUrl: './park-introduction-detail.component.html',
  styleUrls: ['./park-introduction-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParkIntroductionDetailComponent implements OnInit {
  @Output() returnToMainPage: EventEmitter<any>;
  tilePhoto: Object; // 倾斜摄影对象
  map;
  zoom = 10;
  cenL = 118.30612;  // 默认中心坐标经度
  cenB =  34.29057; // 默认中心坐标纬度
  constructor() {
    this.returnToMainPage = new EventEmitter<any>();
  }

  goNoticeList() {
    this.returnToMainPage.emit();
  }

  async initializeMap() {
    // 如果级别是1，显示整张地图
    if (this.zoom === 1) {
      this.cenB = 0;
      this.cenL = 0;
    }
    this.map = new T.Map('mapDiv');
    this.map.centerAndZoom(new T.LngLat(this.cenL, this.cenB), this.zoom);
    const config = {
      // REQUEST:"GetMap",
      version: '1.3.0',
      layers: '0',
      transparent: false,
      srs: 'EPSG:4326',
      crs: 'EPSG:4326'
    };
    this.tilePhoto = new T.TileLayer.WMS('http://192.168.10.5:6080/arcgis/services/Region/MapServer/WMSServer', config);
    this.map.addLayer(this.tilePhoto);
  }

  // Finalize a few things once the MapView has been loaded


  ngOnInit() {
    this.initializeMap()
  }

}
