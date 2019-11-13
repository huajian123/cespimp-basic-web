import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { STColumn } from '@delon/abc';
import { ListPageInfo, PageTypeEnum } from '@core/vo/comm/BusinessEnum';
import {
  ProductionListInfoService,
  ProductionListServiceNs,
} from '@core/biz-services/major-hazard-management/production-list.service';
import ProductionListInfoModel = ProductionListServiceNs.ProductionListInfoModel;
import { MapPipe } from '@shared/directives/pipe/map.pipe';
import { GoBackParam } from '@core/vo/comm/ReturnBackVo';

@Component({
  selector: 'app-major-hazard-management-production-list',
  templateUrl: './production-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MajorHazardManagementProductionListComponent implements OnInit {
  pageTypeEnum = PageTypeEnum;
  currentPage: number;
  expandForm: boolean;
  dataList: ProductionListInfoModel[];
  columns: STColumn[];
  listPageInfo: ListPageInfo;
  itemId: number;

  constructor(private dataService: ProductionListInfoService, private cdr: ChangeDetectorRef) {
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
    const { total, list, pageNum } = await this.dataService.getProductionList(params);
    this.listPageInfo.total = total;
    this.listPageInfo.pi = pageNum;
    this.dataList = list || [];
    this.cdr.markForCheck();
  }

  format(toBeFormat, arg) {
    return new MapPipe().transform(toBeFormat, arg);
  }

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
      { title: '生产场所编号', index: 'roomNo', width: 120 },
      { title: '生产场所名称', index: 'roomName', width: 100 },
      { title: '生产场所面积', index: 'roomArea', width: 120 },
      { title: '投产时间', index: 'roomForm', width: 100 },
      { title: '经度', index: 'longitude', width: 100 },
      { title: '纬度', index: 'latitude', width: 100 },
      { title: '在厂区的位置', index: 'locFactory', width: 100 },
      {
        title: '操作',
        fixed: 'right',
        width: '100px',
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
