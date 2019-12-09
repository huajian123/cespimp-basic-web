import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'park-introduction-detail',
  templateUrl: './park-introduction-detail.component.html',
  styleUrls: ['./park-introduction-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParkIntroductionDetailComponent implements OnInit, AfterViewInit {
  @Output() returnToMainPage: EventEmitter<any>;
  tilePhoto: Object; // 倾斜摄影对象
  map;
  zoom = 10;

  cenL = 118.30612;  // 默认中心坐标经度
  cenB = 34.29057; // 默认中心坐标纬度

  /*d3图层*/
  industrialPark = [];
  industrialParkRealArea = [];
  industrialParkPlanArea = [];
  realArea: any;
  planArea: any;
  pointArea: any;

  constructor() {
    this.returnToMainPage = new EventEmitter<any>();
    const imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?' +
      'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
      '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a65163e2ebdf5a37abb7f49274b85df';
    this.tilePhoto = new T.TileLayer(imageURL, { minZoom: 1, maxZoom: 18 });

    this.realArea = new T.D3Overlay(this.realAreaInit, this.realAreaRedraw);
    this.planArea = new T.D3Overlay(this.planAreaInit, this.planAreaRedraw);
    this.pointArea = new T.D3Overlay(this.pointInit, this.pointRedraw);
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
      crs: 'EPSG:4326',
    };
    this.tilePhoto = new T.TileLayer.WMS('http://192.168.10.5:6080/arcgis/services/Region/MapServer/WMSServer', config);
    this.map.addLayer(this.tilePhoto);
  }

  // Finalize a few things once the MapView has been loaded


  realAreaInit = (sel, transform) => {
    const upd = sel.selectAll('path.geojson1').data(this.industrialParkRealArea);
    upd.enter()
      .append('path')
      .attr('class', 'geojson1')
      .attr('stroke', '#39D510')
      .attr('stroke-width', '5')
      .attr('fill', '#39D510')
      .attr('fill-opacity', '0.1');
  };

  realAreaRedraw = (sel, transform) => {
    sel.selectAll('path.geojson1').each(
      function(d, i) {
        d3.select(this).attr('d', transform.pathFromGeojson);
      },
    );
  };

  planAreaInit = (sel, transform) => {
    const upd = sel.selectAll('path.geojson1').data(this.industrialParkPlanArea);
    upd.enter()


      .append('path')
      .attr('class', 'geojson1')
      .attr('stroke', '#39D510')
      .attr('stroke-width', '5')
      .attr('fill', '#39D510')
      .attr('stroke-dasharray', '10,10')
      .attr('fill-opacity', '0.1');
  };

  planAreaRedraw = (sel, transform) => {
    sel.selectAll('path.geojson1').each(
      function(d, i) {
        d3.select(this).attr('d', transform.pathFromGeojson);
      },
    );
  };

  pointInit = (sel, transform) => {
    const upd = sel.selectAll('path.geojson1').data(this.industrialPark);
    upd.enter()
      .append('path')
      .attr('class', 'geojson1')
      .attr('stroke', '#39D510')
      .attr('stroke-width', '5')
      .attr('fill', '#39D510')
      .attr('fill-opacity', '0.1');
  };

  pointRedraw = (sel, transform) => {
    sel.selectAll('path.geojson1').each(
      function(d, i) {
        d3.select(this).attr('d', transform.pathFromGeojson);
      },
    );
  };


  // 初始化d3相关图层
  initD3Layer() {
    d3.json('../../../../assets/d3/WuZhongRealArea.json', (data) => {
      this.industrialParkRealArea = data.features;
      this.map.addOverLay(this.realArea);
      this.realArea.bringToBack();
    });

    d3.json('../../../../assets/d3/WuZhongPlanArea.json', (data) => {
      this.industrialParkPlanArea = data.features;
      this.map.addOverLay(this.planArea);
      this.realArea.bringToBack();
    });

    d3.json('../../../../assets/d3/point.json', (data) => {
      this.industrialPark = data.features;
      this.map.addOverLay(this.pointArea);
      this.realArea.bringToBack();
    });
  }

  initMap() {
    this.map = new T.Map('mapDiv');
    this.map.centerAndZoom(new T.LngLat(120.662161, 31.222261), 14);
    this.map.addLayer(this.tilePhoto);
    this.initD3Layer();
  }

  ngOnInit() {
    //  this.initializeMap()
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
