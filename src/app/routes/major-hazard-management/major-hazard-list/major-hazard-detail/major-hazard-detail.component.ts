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
  MajorHazardListInfoService,
  MajorHazardListServiceNs,
} from '@core/biz-services/major-hazard-management/major-hazard-list.service';
import MajorHazardListInfoModel = MajorHazardListServiceNs.MajorHazardListInfoModel;
import { STColumn, STColumnButton, STData } from '@delon/abc';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { MapPipe } from '@shared/directives/pipe/map.pipe';
import { Router } from '@angular/router';
import { EVENT_KEY } from '@env/staticVariable';
import { enterpriseInfo } from '@env/environment';


enum PartTypeEnum {
  Tank = 1,
  Warehouse,
  ProductionPlace
}

@Component({
  selector: 'app-major-hazard-management-major-hazard-detail',
  templateUrl: './major-hazard-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MajorHazardManagementMajorHazardDetailComponent implements OnInit {
  @ViewChild('mapDivModal', { static: true }) mapElement: ElementRef;
  map;
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;
  dataInfo: MajorHazardListInfoModel;
  columns: STColumn[];
  currentPolygonList: any[];

  constructor(private http: _HttpClient, private msg: NzMessageService,
              private dataService: MajorHazardListInfoService, private cdr: ChangeDetectorRef,
              private router: Router) {
    this.returnBack = new EventEmitter<any>();
    this.dataInfo = {
      id: -1,
      majorHazardNo: '',
      majorHazardName: '',
      manager: '',
      unitType: -1,
      useDate: new Date(),
      majorHazardLevel: -1,
      majorHazardNature: -1,
      rvalue: -1,
      majorScope: [],
      locFactory: '',
      managerMobile: '',
      description: '',
      majorHazardUnits: [],
    };

    this.columns = [
      {
        title: '组成部分类型', index: 'partType', width: 60,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
      {
        title: '组成部分名称', index: 'partName', width: 60,
      },
      {
        title: '组成部分编号',
        index: '',
        width: 60,
        buttons: [{ type: 'link', text: '点击跳转', click: this.tableBtnClick.bind(this), format: this.formateData }],
      },
    ];
  }

  formateData(record: STData, btn: STColumnButton) {
    return record.partNo;
  }

  tableBtnClick(record, modal, instance) {
    if (record.partType === PartTypeEnum.Tank) {
      this.router.navigate(['/hazard/storage-tank-management/tank-list']);
      window.sessionStorage.setItem(EVENT_KEY.tankNo, record.partNo);
    }
    if (record.partType === PartTypeEnum.ProductionPlace) {
      this.router.navigate(['/hazard/production-management/production-list']);
      window.sessionStorage.setItem(EVENT_KEY.placeNo, record.partNo);
    }
    if (record.partType === PartTypeEnum.Warehouse) {
      this.router.navigate(['/hazard/warehouse-management/warehouse-list']);
      console.log(record);
      window.sessionStorage.setItem(EVENT_KEY.roomNo, record.partNo);
    }
  }

  returnToList() {
    this.returnBack.emit({ refesh: false, pageNo: this.currentPageNum });
  }

  format(toBeFormat, arg) {
    return new MapPipe().transform(toBeFormat, arg);
  }

// 显示多边形地图
  initMap(currentPolygonList) {
    setTimeout(() => {
      const polygonPoints = [];
      currentPolygonList.forEach(({ lng, lat }) => {
        polygonPoints.push(new T.LngLat(lng, lat));
      });
      const zoom = 18;
      this.map = new T.Map(this.mapElement.nativeElement);
      // 设置显示地图的中心点和级别
      if(polygonPoints.length != 0){
        this.map.centerAndZoom(new T.LngLat(polygonPoints[0].lng, polygonPoints[0].lat), zoom);
      }else{
        this.map.centerAndZoom(new T.LngLat(enterpriseInfo.longitude, enterpriseInfo.latitude), zoom);
      }
      const imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?' +
        'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
        '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a65163e2ebdf5a37abb7f49274b85df';
      const tilePhoto = new T.TileLayer(imageURL, { minZoom: 1, maxZoom: 18 });
      this.map.addLayer(tilePhoto);
      const polygon = new T.Polygon(polygonPoints, {
        color: 'blue',
        weight: 3,
        opacity: 0.5,
        fillColor: '#FFFFFF',
        fillOpacity: 0.5,
      });
      this.map.addLayer(polygon);
    });
  }

  async getDetailInfo(id?) {
    this.dataInfo = await this.dataService.getMajorHazardInfoDetail(id ? id : this.id);
    //console.log(this.dataInfo);
    this.initMap(this.dataInfo.majorScope);
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.getDetailInfo();
  }
}
