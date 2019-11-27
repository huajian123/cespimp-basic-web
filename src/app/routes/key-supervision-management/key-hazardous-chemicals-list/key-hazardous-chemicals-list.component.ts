import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { STColumn} from '@delon/abc';
import { ListPageInfo, PageTypeEnum, RoleEnum } from '@core/vo/comm/BusinessEnum';
import {
  HazardousChemicalInfoService,
  HazardousChemicalListServiceNs,
} from '@core/biz-services/key-supervision-management/key-hazardous-chemicals.service';
import HazardousChemicalInfoModel = HazardousChemicalListServiceNs.HazardousChemicalInfoModel;
import { GoBackParam } from '@core/vo/comm/ReturnBackVo';
import { MessageType, ShowMessageService } from '../../../widget/show-message/show-message';

@Component({
  selector: 'app-key-supervision-management-key-hazardous-chemicals-list',
  templateUrl: './key-hazardous-chemicals-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeySupervisionManagementKeyHazardousChemicalsListComponent implements OnInit {
  roleEnum = RoleEnum;
  pageTypeEnum = PageTypeEnum;
  currentPage: number;
  expandForm: boolean;
  dataList: HazardousChemicalInfoModel[];
  columns: STColumn[];
  listPageInfo: ListPageInfo;
  itemId: number;
  constructor(private dataService: HazardousChemicalInfoService, private cdr: ChangeDetectorRef,private messageService: ShowMessageService) {
    this.expandForm = false;
    this.currentPage = this.pageTypeEnum.List;
    this.columns = [];
    this.listPageInfo = {
      total: 0,
      ps: 10,// 每页数量
      pi: 1,// 当前页码
    };
    this.dataList = [];
    this.itemId = -1;
  }

  changePage(e) {
    this.listPageInfo = e;
    this.getDataList();
  }

  async getDataList(pageNumber?: number) {
    const params = {
      pageNum: pageNumber || this.listPageInfo.pi,
      pageSize: this.listPageInfo.ps,
    };
    const { total, list, pageNum } = await this.dataService.getHazardousChemicalList(params);
    this.listPageInfo.total = total;
    this.listPageInfo.pi = pageNum;
    this.dataList = list || [];
    this.cdr.markForCheck();
  }

  add() {
    this.itemId = null;
    this.currentPage = this.pageTypeEnum.AddOrEdit;
  }

  goEditAddPage(item, modal) {
    this.itemId = item.id;
    this.currentPage = this.pageTypeEnum.AddOrEdit;
  }

  goDetailPage(item, modal) {
    this.itemId = item.id;
    this.currentPage = this.pageTypeEnum.DetailOrExamine;
  }

  goDeletePage(item, modal) {
    const modalCtrl = this.messageService.showAlertMessage('', '您确定要删除吗？', MessageType.Confirm);
    modalCtrl.afterClose.subscribe((type: string) => {
      if (type !== 'onOk') {
        return;
      }
      this.itemId = item.id;
      this.dataService.delHazardousChemical(this.itemId).then(() => this.getDataList(1));
    });
  }
  async returnToList(e?: GoBackParam) {
    this.currentPage = this.pageTypeEnum.List;
    if (!!e && e.refesh) {
      this.listPageInfo.pi = e.pageNo;
      await this.getDataList(e.pageNo);
    }
  }
  private initTable(): void {
    this.columns = [
      { title: '企业名称', index: 'entprName', width: 120, acl: this.roleEnum[this.roleEnum.ParkManage] },
      { title: '品名', index: 'productName', width: 80 },
      { title: '别名', index: 'alias', width: 80 },
      { title: 'CAS号', index: 'casNo', width: 80 },
      {
        title: '操作',
        fixed: 'right',
        width: '130px',
        buttons: [
          {
            text: '编辑',
            icon: 'edit',
            click: this.goEditAddPage.bind(this),
            acl: this.roleEnum[this.roleEnum.Enterprise],
          },
          {
            text: '删除',
            icon: 'delete',
            click: this.goDeletePage.bind(this),
            acl: this.roleEnum[this.roleEnum.Enterprise],
          },
          {
            text: '查看',
            icon: 'eye',
            click: this.goDetailPage.bind(this),
          },
        ],
      },
    ];
  }

  ngOnInit() {
    this.initTable();
    this.getDataList();
  }
}
