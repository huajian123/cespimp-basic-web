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
import { ListPageInfo, LoginInfoModel, OptionsInterface } from '@core/vo/comm/BusinessEnum';
import EntprPageSearchModel = BasicInfoServiceNs.EntprPageSearchModel;
import { MapPipe, MapSet } from '@shared/directives/pipe/map.pipe';
import ProductEnum = BasicInfoServiceNs.ProductEnum;
import EntprProductSearchModel = BasicInfoServiceNs.EntprProductSearchModel;
import EnterpriseProductModel = BasicInfoServiceNs.EnterpriseProductModel;
import ProductionDeviceListInfoModel = BasicInfoServiceNs.ProductionDeviceListInfoModel;
import LastExamineInfoModel = BasicInfoServiceNs.LastExamineInfoModel;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EVENT_KEY } from '@env/staticVariable';
import { BasicInfoAuditService } from '@core/biz-services/basic-info/basic-info-audit-service';

enum TabEnum {
  BaseInfoTab,
  PositionTab,
  IdCardTab,
  EnterpriseEnvirTab,
  MateriProductionTab,
  MidProductTab,
  FinalProductTab,
  ProductionDeviceTab
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


  dataList: EnterpriseEnvironModel[] | EnterpriseProductModel[] | ProductionDeviceListInfoModel[];
  columns: STColumn[];
  tabEnum = TabEnum;
  currentTab: number;
  listPageInfo: ListPageInfo;
  @Input() entprId: number;
  lastExamineInfo: LastExamineInfoModel;
  isVisible = false;
  validateForm: FormGroup;
  statusOptions: OptionsInterface[];
  loginInfo: LoginInfoModel;

  constructor(private dataService: BasicInfoService, private cdr: ChangeDetectorRef, private fb: FormBuilder, private basicInfoAuditService: BasicInfoAuditService) {
    this.returnBack = new EventEmitter<any>();
    this.initData();
    this.currentTab = this.tabEnum.BaseInfoTab;
    this.dataList = [];
    this.lastExamineInfo = {
      applicationName: '--',
      applicationTime: '--',
      reviewName: '--',
      reviewTime: '--',
      reviewExplain: '--',
      reviewStatus: '--',
      entprName: '--',
    };

  }

  initData() {
    this.dataInfo = {
      id: -1,
      entprName: '',
      entprSimpleName: '',
      region: '',
      detailAddr: '',
      entprScope: [],
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

  /*确认审核*/
  async handleOk() {
    Object.keys(this.validateForm.controls).forEach(key => {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    });

    if (this.validateForm.invalid) return;
    const param = this.validateForm.getRawValue();
    param.id = this.lastExamineInfo.id;
    param.reviewName = this.loginInfo.realName;
    param.reviewTime = this.loginInfo.updateTime;
    await this.basicInfoAuditService.doExamine(param);
    this.isVisible = false;
    this.getLastExamineInfo();

  }

  initForm() {
    this.validateForm = this.fb.group({
      reviewStatus: [null, [Validators.required]],
      reviewExplain: [null, [Validators.required]],
    });
  }


  /*取消审核*/
  handleCancel(): void {
    this.isVisible = false;
  }

  goExamine() {
    this.isVisible = true;
    this.validateForm.reset();
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
      case TabEnum.ProductionDeviceTab: {
        this.columns = [
          { title: '装置编号', index: 'deviceNo', width: 80 },
          { title: '生产装置名称', index: 'deviceName', width: 80 },
          { title: '生产装置型号', index: 'deviceModel', width: 80 },
          { title: '生产装置功能', index: 'deviceFunction', width: 100 },
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

  // 获取生产设备
  async getProductionDevice() {
    const param: EntprPageSearchModel = {
      entprId: this.entprId,
      pageNum: this.listPageInfo.pi,
      pageSize: this.listPageInfo.ps,
    };
    const { total, pageNum, list } = await this.dataService.getProductionDeviceList(param);
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
    const { total, pageNum, list } = await this.dataService.getEnterProductList(param);
    this.listPageInfo.total = total;
    this.listPageInfo.pi = pageNum;
    this.dataList = list || [];
    this.cdr.markForCheck();
  }

  async change(args: NzTabChangeEvent) {
    this.currentTab = args.index;
    // 周边环境
    if (args.index === TabEnum.EnterpriseEnvirTab) {
      this.getEnterpriseEnviron();
      this.changeTap(TabEnum.EnterpriseEnvirTab);
    }
    if (args.index === TabEnum.BaseInfoTab) {
     this.getFactoryInfo();
    }
    if (args.index === TabEnum.ProductionDeviceTab) {
      this.getProductionDevice();
      this.changeTap(TabEnum.ProductionDeviceTab);
    }
    // 位置信息
    else if (args.index === TabEnum.PositionTab) {
      const param: EntprSearch = {
        entprId: this.entprId,
      };
      this.dataInfo = await this.dataService.getFactoryInfoDetail(param);
      this.map.checkResize();
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
  }

  returnBackToList() {
    this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });
  }

  initMap(latitude, longitude) {
    setTimeout(() => {
      const zoom = 18;
      const imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?' +
        'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
        '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=0a65163e2ebdf5a37abb7f49274b85df';
      const tilePhoto = new T.TileLayer(imageURL, { minZoom: 1, maxZoom: 18 });
      this.map = new T.Map(this.mapElement.nativeElement);
      // 设置显示地图的中心点和级别
      this.map.centerAndZoom(new T.LngLat(longitude, latitude), zoom);
      this.map.addLayer(tilePhoto);
      this.initEnterpriseArea();
    });
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
    this.addMarkerToMap(this.dataInfo.latitude, this.dataInfo.longitude);
  }

  addMarkerToMap(lat, lng) {
    const marker = new T.Marker(new T.LngLat(lat, lng));
    this.map.addOverLay(marker);
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
    const { list } = await this.dataService.getIdCardInfoDetail(param);
    this.idCardInfo = list[0];
    if (!this.idCardInfo) {
      this.initData();
    }
    this.cdr.markForCheck();
  }

  // 获取最新审核记录信息
  async getLastExamineInfo() {
    const tempData = await this.dataService.getLastExamineInfo(this.entprId);
    console.log(tempData);
    if (!!tempData) {
      this.lastExamineInfo = tempData;
    }
    this.cdr.markForCheck();
  }

  ngAfterViewInit(): void {
    this.getFactoryInfo();
    this.getLastExamineInfo();
  }

  ngOnInit(): void {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.initForm();
    this.statusOptions = [...MapPipe.transformMapToArray(MapSet.reviewStatus)];
    this.statusOptions.shift();
  }
}
