import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { BasicInfoService, BasicInfoServiceNs } from '@core/biz-services/basic-info/basic-info.service';
import { OptionsInterface, SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import FactoryInfoModel = BasicInfoServiceNs.FactoryInfoModel;
import * as d3 from 'd3';
import { SafetyMapServiceNs } from '@core/biz-services/safety-map/safety-map.service';
import LatitudeLongitudeModel = SafetyMapServiceNs.LatitudeLongitudeModel;

enum EnterpriseUrlEnum {
  Normal = '../../../../assets/imgs/safeOnePage/cover.png',
  Sel = '../../../../assets/imgs/safeOnePage/cover-sel.png',
}

enum PageTypeEnum {
  EnterpriseList,
  EnterpriseItem
}

@Component({
  selector: 'safety-map-safety-map-list',
  templateUrl: './safety-map-list.component.html',
  styleUrls: ['./safety-map-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafetyMapSafetyMapListComponent implements OnInit, AfterViewInit {
  map;
  businessSelOptions: OptionsInterface[];
  enterpriseList: FactoryInfoModel[];
  enterpriseArray: any[]; // 企业覆盖物存储数组
  selectedEnterpriseId = -1; // 选中的企业
  pageTypeEnum = PageTypeEnum;
  currentPageType: number;
  tilePhoto: Object; // 倾斜摄影对象
  selEnterprisePosition: LatitudeLongitudeModel;


  /*d3图层*/
  industrialPark = [];
  industrialParkRealArea = [];
  industrialParkPlanArea = [];
  realArea: any;
  planArea: any;
  pointArea: any;

  constructor(private basicInfoService: BasicInfoService, private cdr: ChangeDetectorRef) {
    this.businessSelOptions = [];
    this.enterpriseArray = [];
    this.currentPageType = this.pageTypeEnum.EnterpriseList;
    const imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?' +
      'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
      '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a65163e2ebdf5a37abb7f49274b85df';
    this.tilePhoto = new T.TileLayer(imageURL, { minZoom: 1, maxZoom: 18 });
    this.selEnterprisePosition = {
      lat: 0,
      lng: 0,
    };


    this.realArea = new T.D3Overlay(this.realAreaInit, this.realAreaRedraw);
    this.planArea = new T.D3Overlay(this.planAreaInit, this.planAreaRedraw);
    this.pointArea = new T.D3Overlay(this.pointInit, this.pointRedraw);
  }

  initMap() {
    this.map = new T.Map('mapDiv');
    this.map.centerAndZoom(new T.LngLat(120.680416, 31.206039), 14);
    this.map.addLayer(this.tilePhoto);
    this.initD3Layer();
  }


  // 获取企业列表
  async getBusinessList() {
    const param: SearchCommonVO = {
      pageNum: 1,
      pageSize: 0,
    };
    const { list } = await this.basicInfoService.getFactoryList(param);
    list.forEach(({ id, entprName }) => {
      const obj = { value: id, label: entprName };
      this.businessSelOptions.push(obj);
    });
    this.enterpriseList = list;
  }

  // 创建工厂覆盖物
  createMarker(iconUrl: string, longitude: number, latitude: number, markId: number, type?) {
    const icon = new T.Icon({
      iconUrl,
      iconSize: new T.Point(27, 27),
      iconAnchor: new T.Point(10, 25),
    });
    const marker = new T.Marker(new T.LngLat(longitude, latitude), { icon });
    marker.setOptions = { id: markId, type: type || null };
    return marker;
  }

  // 创建企业覆盖物
  createEnterpriseMarker(selId?) {
    this.enterpriseArray.length = 0;
    let iconUrl = '';
    this.enterpriseList.forEach(item => {
      iconUrl = selId === item.id ? EnterpriseUrlEnum.Sel : EnterpriseUrlEnum.Normal;
      const marker = this.createMarker(iconUrl, item.longitude, item.latitude, item.id);
      this.enterpriseArray.push(marker);
      this.map.addOverLay(marker);
    });
    this.enterpriseMarkerClickFn();
  }

  // 修改搜索下拉框
  changeSelValue(event) {
    this.createEnterpriseMarker(event);
  }

  // 工厂覆盖物点击方法
  enterpriseMarkerClickFn() {
    this.enterpriseArray.forEach(item => {
      item.addEventListener('click', () => {
        setTimeout(() => {
          this.selectedEnterpriseId = item.setOptions.id;
          this.currentPageType = this.pageTypeEnum.EnterpriseItem;
          this.selEnterprisePosition = {
            lng: item.or.lng,
            lat: item.or.lat,
          };
          this.cdr.markForCheck();
        }, 0);
      });
    });
  }

  returnToMap() {
    this.currentPageType = this.pageTypeEnum.EnterpriseList;
    setTimeout(()=>{
      this.map.checkResize();
    },0);

    console.log(this.map);
  }

  realAreaInit = (sel, transform) => {
    const upd = sel.selectAll('path.geojson1').data(this.industrialParkRealArea);
    upd.enter()
      .append('path')
      .attr('class', 'geojson1')
      .attr('stroke', 'red')
      .attr('stroke-width', '5')
      .attr('fill', '#ffffff')
      .attr('fill-opacity', '0');
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
      .attr('stroke', 'red')
      .attr('stroke-dasharray', '10,10')
      .attr('stroke-width', '5')
      .attr('fill', '#ffffff')
      .attr('fill-opacity', '0');
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
      .attr('stroke', 'red')
      .attr('stroke-width', '5')
      .attr('fill', '#ffffff')
      .attr('fill-opacity', '0');
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


  async ngOnInit() {
    await this.getBusinessList();
    this.createEnterpriseMarker();

  }

  ngAfterViewInit(): void {
    this.initMap();
  }


}
