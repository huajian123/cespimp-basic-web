import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output, ViewChild,
} from '@angular/core';
import { BasicInfoService, BasicInfoServiceNs } from '@core/biz-services/basic-info/basic-info.service';
import { NzMessageService, NzTabChangeEvent } from 'ng-zorro-antd';
import FactoryInfoModel = BasicInfoServiceNs.FactoryInfoModel;
import EntprSearch = BasicInfoServiceNs.EntprSearch;
import IdCardTabModel = BasicInfoServiceNs.IdCardTabModel;
import { STColumn, STData } from '@delon/abc';
import EnterpriseEnvironModel = BasicInfoServiceNs.EnterpriseEnvironModel;
import { ListPageInfo } from '@core/vo/comm/BusinessEnum';
import EntprPageSearchModel = BasicInfoServiceNs.EntprPageSearchModel;
import { MapPipe } from '@shared/directives/pipe/map.pipe';
import ProductEnum = BasicInfoServiceNs.ProductEnum;
import EntprProductSearchModel = BasicInfoServiceNs.EntprProductSearchModel;
import EnterpriseProductModel = BasicInfoServiceNs.EnterpriseProductModel;

enum TabEnum {
  BaseInfoTab,
  PositionTab,
  IdCardTab,
  EnterpriseEnvirTab,
  MateriProductionTab,
  MidProductTab,
  FinalProductTab
}

@Component({
  selector: 'app-basic-info-detail',
  templateUrl: './basic-info-detail.component.html',
  styleUrls: ['./basic-info-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoDetailComponent implements OnInit, AfterViewInit {

  @ViewChild('mapDivModal', { static: true }) mapElement: ElementRef;
  map;
  @Output() returnBack: EventEmitter<any>;
  @Input() currentPageNum: number;
  dataInfo: FactoryInfoModel;
  idCardInfo: IdCardTabModel;
  showImgUrl: string;
  isShowPreviewModal: boolean;
  dataList: EnterpriseEnvironModel[] | EnterpriseProductModel[];
  columns: STColumn[];
  tabEnum = TabEnum;
  currentTab: number;
  listPageInfo: ListPageInfo;
  @Input() entprId: number;

  constructor(private dataService: BasicInfoService, private cdr: ChangeDetectorRef) {
    this.returnBack = new EventEmitter<any>();
    this.initData();

    this.showImgUrl = '';
    this.isShowPreviewModal = false;
    this.currentTab = this.tabEnum.BaseInfoTab;
    this.dataList = [];

  }

  initData() {
    this.dataInfo = {
      id: -1,
      entprName: '',
      entprSimpleName: '',
      region: '',
      detailAddr: '',
      entprScope: '',
      legalPerson: '',
      legalMobile: '',
      boss: '',
      bossMobile: '',
      safetyManager: '',
      safetyMobile: '',
      businessScope: '',
      longitude: -1,
      latitude: -1,
      operatingStatus: -1,
      ecoType: -1,
      entprScale: -1,
      regCapi: -1,
      floorArea: -1,
      employeeNum: -1,
      specialOperationNum: -1,
      standLevel: -1,
      safetySupervisionLevel: -1,
      localSafetyAdmin: -1,
    };
    this.idCardInfo = {
      id: -1,
      uscCode: '',
      businessLicencesEndTime: new Date(),
      businessLicencesBeginTime: new Date(),
      businessLicencesRange: '',
      businessLicencesAuthority: '',
      businessLicencesAccessory: '',
      safetyCertificateBeginTime: new Date(),
      safetyCertificateEndTime: new Date(),
      safetyPermitRange: '',
      safetyCertificateAuthority: '',
      safetyCertificateAccessory: '',
      dischargePermitCode: '',
      safetyCertificateCode: '',
      dischargePermitBeginTime: new Date(),
      dischargePermitEndTime: new Date(),
      dischargePermitType: '',
      dischargePermitAuthority: '',
      safetyReportName: '',
      safetyReportRecordTime: new Date(),
      safetyReportAgency: '',
      safetyReportAccessory: '',
      environmentReportName: '',
      environmentRecordTime: new Date(),
      environmentReportAgency: '',
      environmentReportAccessory: '',
    };
    this.listPageInfo = {
      total: 0,
      ps: 10,// 每页数量
      pi: 1,// 当前页码
    };
  }

  format(toBeFormat, arg) {
    return new MapPipe().transform(toBeFormat, arg);
  }

  changeTap(tab) {
    switch (tab) {
      case TabEnum.EnterpriseEnvirTab: {
        this.columns = [
          {
            title: '周边环境类型',
            index: 'envrType',
            width: 120,
            format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
          },
          { title: '周边环境名称', index: 'envrName', width: 100 },
          {
            title: '周边环境方位',
            index: 'envrDirection',
            width: 120,
            format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
          },
          { title: '与本企业最小距离（米）', index: 'miniDistance', width: 100 },
          {
            title: '建筑结构',
            index: 'buildStruct',
            width: 100,
            format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
          },
          { title: '相邻建筑高度（米）', index: 'adjacentBuildHeight', width: 100 },
          { title: '人员数量（人）', index: 'personNum', width: 100 },
          { title: '联系人', index: 'envrContacts', width: 100 },
          { title: '联系人移动电话', index: 'contactMoble', width: 100 },
        ];
        break;
      }
      case TabEnum.MateriProductionTab: {
        this.columns = [
          {
            title: '产品类型',
            index: 'productType',
            width: 120,
            format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
          },
          { title: '品名', index: 'productName', width: 100 },
          {
            title: '别名',
            index: 'alias',
            width: 120,
          },
          { title: 'CAS号', index: 'casNo', width: 100 },
          {
            title: '年消耗量（吨）',
            index: 'annualConsumption',
            width: 100,
          },
          { title: '年生产能力（吨）', index: 'annualThroughput', width: 100 },
          { title: '设计贮存最大量（吨）', index: 'maximumReserves', width: 100 },
        ];
        break;
      }
    }
  }

  // 获取周边情况
  async getEnterpriseEnviron() {
    const param: EntprPageSearchModel = {
      entprId: this.entprId,
      pageNum: this.listPageInfo.pi,
      pageSize: this.listPageInfo.ps,
    };
    const { total, pageNum, list } = await this.dataService.getEnterpriseEnviron(param);
    this.listPageInfo.total = total;
    this.listPageInfo.pi = pageNum;
    this.dataList = list || [];
    this.cdr.markForCheck();
  }

  // 生产原料信息，中间产品信息，最终产品信息
  async getProduction(currentProductType = 1) {
    const param: EntprProductSearchModel = {
      productType: currentProductType,
      entprId: this.entprId,
      pageNum: this.listPageInfo.pi,
      pageSize: this.listPageInfo.ps,
    };
    const { total, pageNum, list } = await this.dataService.getEnterProduct(param);
    this.listPageInfo.total = total;
    this.listPageInfo.pi = pageNum;
    this.dataList = list || [];
    this.cdr.markForCheck();
  }

  async change(args: NzTabChangeEvent) {
    // 周边环境
    if (args.index === TabEnum.EnterpriseEnvirTab) {
      this.getEnterpriseEnviron();
      this.changeTap(TabEnum.EnterpriseEnvirTab);
    }
    // 位置信息
    else if (args.index === TabEnum.PositionTab) {
      this.getFactoryInfo();
    }
    // 生产原料信息，中间产品信息，最终产品信息
    else if (args.index === TabEnum.MateriProductionTab || args.index === TabEnum.MidProductTab || args.index === TabEnum.FinalProductTab) {
      let currentProductType: ProductEnum;
      switch (args.index) {
        case TabEnum.MateriProductionTab: {
          this.changeTap(TabEnum.MateriProductionTab);
          currentProductType = ProductEnum.RawMateriPro;
          break;
        }
        case  TabEnum.MidProductTab: {
          this.changeTap(TabEnum.MateriProductionTab);
          currentProductType = ProductEnum.MidPro;
          break;
        }
        case  TabEnum.FinalProductTab: {
          this.changeTap(TabEnum.MateriProductionTab);
          currentProductType = ProductEnum.FinalPro;
          break;
        }
      }
      this.getProduction(currentProductType);
    } else if (args.index === TabEnum.IdCardTab) {
      this.getIdCardInfo();
    }
    this.currentTab = args.index;
  }

  public showPreviewModal(imgType) {
    this.showImgUrl = this.dataInfo[imgType];
    this.isShowPreviewModal = true;
  }

  returnBackToList() {
    this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });
  }

  initMap(latitude, longitude) {
    const zoom = 10;
    this.map = new T.Map(this.mapElement.nativeElement);
    // 设置显示地图的中心点和级别
    this.map.centerAndZoom(new T.LngLat(longitude, latitude), zoom);
  }

  async getFactoryInfo() {
    const param: EntprSearch = {
      entprId: this.entprId,
    };
    this.dataInfo = await this.dataService.getFactoryInfoDetail(param);
    this.initMap(this.dataInfo.latitude, this.dataInfo.longitude);
    this.cdr.markForCheck();
  }

  async getIdCardInfo() {
    const param: EntprPageSearchModel = {
      entprId: this.entprId,
      pageNum: this.listPageInfo.pi,
      pageSize: this.listPageInfo.ps,
    };
    this.idCardInfo = await this.dataService.getIdCardInfoDetail(param)[0];
    if (!this.idCardInfo) {
      this.initData();
    }
    console.log(this.idCardInfo);
    this.cdr.markForCheck();
  }

  ngAfterViewInit(): void {
    this.getFactoryInfo();
  }

  ngOnInit(): void {
  }
}
