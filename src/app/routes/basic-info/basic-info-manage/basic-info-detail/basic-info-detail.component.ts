import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BasicInfoService, BasicInfoServiceNs } from '@core/biz-services/basic-info/basic-info.service';
import { NzMessageService, NzTabChangeEvent } from 'ng-zorro-antd';
import FactoryInfoModel = BasicInfoServiceNs.FactoryInfoModel;
import EntprSearch = BasicInfoServiceNs.EntprSearch;
import IdCardTabModel = BasicInfoServiceNs.IdCardTabModel;

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
export class BasicInfoDetailComponent implements OnInit {
  @Output() returnBack: EventEmitter<any>;
  @Input() currentPageNum: number;
  dataInfo: FactoryInfoModel;
  idCardInfo: IdCardTabModel;
  showImgUrl: string;
  isShowPreviewModal: boolean;
  /*dataList: any[];*/
  /* columns: STColumn[];*/
  tabEnum = TabEnum;
  currentTab: number;
  @Input() entprId: number;

  constructor(private dataService: BasicInfoService, private cdr: ChangeDetectorRef) {
    this.returnBack = new EventEmitter<any>();
    this.initData();

    this.showImgUrl = '';
    this.isShowPreviewModal = false;
    this.currentTab = this.tabEnum.BaseInfoTab;
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
  }

  change(args: NzTabChangeEvent) {
    this.currentTab = args.index;
  }

  public showPreviewModal(imgType) {
    this.showImgUrl = this.dataInfo[imgType];
    this.isShowPreviewModal = true;
  }

  returnBackToList() {
    this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });
  }

  async getFactoryInfo() {
    const param: EntprSearch = {
      entprId: this.entprId,
    };
    this.dataInfo = await this.dataService.getFactoryInfoDetail(param);
    Object.keys(this.dataInfo).forEach(key => {
      if (!this.dataInfo[key]) {
        this.dataInfo[key] = '暂无信息';
      }
    });
    this.cdr.markForCheck();
  }

  async getIdCardInfo() {
    const param: EntprSearch = {
      entprId: this.entprId,
    };
    this.idCardInfo = await this.dataService.getIdCardInfoDetail(param);
    if (!this.idCardInfo) {
      this.initData();
    }
    this.cdr.markForCheck();
  }


  ngOnInit(): void {
    this.getFactoryInfo();
    this.getIdCardInfo();
  }
}
