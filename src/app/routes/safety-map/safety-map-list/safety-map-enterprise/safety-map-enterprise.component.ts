import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BasicInfoService } from '@core/biz-services/basic-info/basic-info.service';

@Component({
  selector: 'safety-map-enterprise',
  templateUrl: './safety-map-enterprise.component.html',
  styleUrls: ['./safety-map-enterprise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafetyMapEnterpriseComponent implements OnInit, AfterViewInit {
  map;
  tilePhoto: Object; // 倾斜摄影对象
  constructor(private cdr: ChangeDetectorRef) {
    const imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?' +
      'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
      '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a65163e2ebdf5a37abb7f49274b85df';
    this.tilePhoto = new T.TileLayer(imageURL, { minZoom: 1, maxZoom: 18 });
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
