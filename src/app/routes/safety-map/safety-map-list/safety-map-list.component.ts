import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BasicInfoService, BasicInfoServiceNs } from '@core/biz-services/basic-info/basic-info.service';
import { OptionsInterface, SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import FactoryInfoModel = BasicInfoServiceNs.FactoryInfoModel;

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
  selectedEnterprise = null; // 选中的企业
  pageTypeEnum = PageTypeEnum;
  currentPageType: number;

  constructor(private basicInfoService: BasicInfoService, private cdr: ChangeDetectorRef) {
    this.businessSelOptions = [];
    this.enterpriseArray = [];
    this.currentPageType = this.pageTypeEnum.EnterpriseList;
  }

  initMap() {
    this.map = new T.Map('mapDiv');
    this.map.centerAndZoom(new T.LngLat(118.30612, 34.29057), 10);
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
    console.log(1);
  }

  // 创建工厂覆盖物
  createMarker(iconUrl: string, longitude: number, latitude: number, markId: number, type?) {
    const icon = new T.Icon({
      iconUrl: iconUrl,
      iconSize: new T.Point(27, 27),
      iconAnchor: new T.Point(10, 25),
    });
    const marker = new T.Marker(new T.LngLat(longitude, latitude), { icon: icon });
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
          this.currentPageType = this.pageTypeEnum.EnterpriseItem;
          this.cdr.markForCheck()
        }, 0);
      });
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
