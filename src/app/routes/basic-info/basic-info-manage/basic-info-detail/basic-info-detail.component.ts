import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasicInfoService, BasicInfoServiceNs } from '@core/biz-services/basic-info/basic-info.service';
import { NzMessageService, NzTabChangeEvent } from 'ng-zorro-antd';
import FactoryInfoModel = BasicInfoServiceNs.FactoryInfoModel;
import EntprSearch = BasicInfoServiceNs.EntprSearch;

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
})
export class BasicInfoDetailComponent implements OnInit {
  @Output() returnBack: EventEmitter<any>;
  @Input() currentPageNum: number;
  /*list: any[] = [];*/
  dataInfo: FactoryInfoModel;
  showImgUrl: string;
  isShowPreviewModal: boolean;
  /*dataList: any[];*/
  /* columns: STColumn[];*/
  tabEnum = TabEnum;
  currentTab: number;
  @Input() entprId: number;


  constructor(private dataService: BasicInfoService, private cdr: ChangeDetectorRef) {
    this.returnBack = new EventEmitter<any>();
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
      majorHazardFlag: -1,
      majorHazardLevel: -1,
    };
    this.showImgUrl = '';
    this.isShowPreviewModal = false;
    this.currentTab = this.tabEnum.BaseInfoTab;
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
    this.cdr.markForCheck()
  }

  /*  private initTable(): void {
      this.columns = [
        { title: '企业的中文全称', index: 'entprName', width: 120 },
        { title: '主要负责人', index: 'boss', width: 100 },
        { title: '主要负责人移动电话', index: 'bossMobile', width: 120 },
        {
          title: '经营状态',
          index: 'operatingStatus',
          width: 100,
        },
        { title: '经济类型', index: 'ecoType', width: 100 },
        { title: '企业规模', index: 'entprScale', width: 100 },
      ];
    }*/

  /* async getDataList(pageNumber?: number) {
         const params = {
           pageNum: pageNumber || this.tableConfig.pageNum,
           pageSize: this.tableConfig.pageSize,
         };
         await this.dataService.getFactoryList(params);
         const { total, list, pageNum } = await this.dataService.getFactoryList(params);
         this.tableConfig.total = total;
         this.tableConfig.pageNum = pageNum;
         this.dataList = list || [];

   }*/

  ngOnInit(): void {
    /*this.initTable();*/
    this.getFactoryInfo();
    /*this.getDataList(1);*/
  }
}
