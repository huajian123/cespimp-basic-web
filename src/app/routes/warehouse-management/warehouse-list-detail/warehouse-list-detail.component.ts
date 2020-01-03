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
  WarehouseListInfoService,
  WarehouseListServiceNs,
} from '@core/biz-services/warehouse-management/warehouse-list.service';
import WarehouseListInfoModel = WarehouseListServiceNs.WarehouseListInfoModel;
import { STColumn } from '@delon/abc';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-warehouse-management-warehouse-list-detail',
  templateUrl: './warehouse-list-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarehouseManagementWarehouseListDetailComponent implements OnInit {
  @ViewChild('mapDivModal', { static: true }) mapElement: ElementRef;
  map;
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;
  dataInfo: WarehouseListInfoModel;
  columns: STColumn[];

  constructor(private http: _HttpClient, private msg: NzMessageService,
              private dataService: WarehouseListInfoService, private cdr: ChangeDetectorRef) {
    this.returnBack = new EventEmitter<any>();

    this.dataInfo = {
      id: -1,
      roomNo: '',
      roomName: '',
      roomForm: -1,
      longitude: -1,
      latitude: -1,
      fireLevel: -1,
      locFactory: '',
      productionDate: new Date(),
      majorHazardMaterials: [],
      majorHazardMaterialInsertDTOS: [],
    };

    this.columns = [
      { title: '品名', index: 'productName', width: 60 },
      { title: 'CAS号', index: 'casNo', width: 60 },
      { title: '临界量（吨）', index: 'criticalMass', width: 60 },
      {
        title: '设计贮存最大量（吨）',
        index: 'maximumReserves',
        width: 60,
      },
    ];
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
    this.dataInfo = await this.dataService.getWarehouseInfoDetail(this.id);
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
