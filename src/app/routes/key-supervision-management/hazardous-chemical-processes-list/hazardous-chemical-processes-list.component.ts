import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { STColumn } from '@delon/abc';
import { ListPageInfo, PageTypeEnum, RoleEnum } from '@core/vo/comm/BusinessEnum';
import { GoBackParam } from '@core/vo/comm/ReturnBackVo';
import {
  HazardousChemicalProcessesInfoService,
  HazardousChemicalProcessesListServiceNs,
} from '@core/biz-services/key-supervision-management/hazardous-chemical-processes.service';
import HazardousChemicalProcessesInfoModel = HazardousChemicalProcessesListServiceNs.HazardousChemicalProcessesInfoModel;

@Component({
  selector: 'app-key-supervision-management-hazardous-chemical-processes-list',
  templateUrl: './hazardous-chemical-processes-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeySupervisionManagementHazardousChemicalProcessesListComponent implements OnInit {
  roleEnum = RoleEnum;
  pageTypeEnum = PageTypeEnum;
  currentPage: number;
  expandForm: boolean;
  dataList: HazardousChemicalProcessesInfoModel[];
  columns: STColumn[];
  listPageInfo: ListPageInfo;
  itemId: number;
  constructor(private dataService: HazardousChemicalProcessesInfoService, private cdr: ChangeDetectorRef) {
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
    const { total, list, pageNum } = await this.dataService.getHazardousChemicalProcessesList(params);
    this.listPageInfo.total = total;
    this.listPageInfo.pi = pageNum;
    this.dataList = list || [];
    this.cdr.markForCheck();
  }

/*
  format(toBeFormat, arg) {
    return new MapPipe().transform(toBeFormat, arg);
  }
*/

  goEditAddPage(item, modal) {
    this.currentPage = this.pageTypeEnum.AddOrEdit;
  }

  goDetailPage(item, modal) {
    this.itemId = item.id;
    this.currentPage = this.pageTypeEnum.DetailOrExamine;
  }

  async returnToList(e?: GoBackParam) {
    this.currentPage = this.pageTypeEnum.List;
    if (!!e && e.refesh) {
      this.listPageInfo.ps = e.pageNo;
      await this.getDataList(e.pageNo);
    }
  }
  private initTable(): void {
    this.columns = [
      { title: '危险工艺名称', index: 'processName', width: 80 },
     /* { title: '别名', index: 'alias', width: 80 },
      { title: 'CAS号', index: 'casNo', width: 80 },*/
      {
        title: '操作',
        fixed: 'right',
        width: '50px',
        buttons: [
          {
            text: '编辑',
            icon: 'edit',
            click: this.goEditAddPage.bind(this),
          },
          {
            text: '删除',
            icon: 'delete',
            click: (_record, modal) => 123,
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
