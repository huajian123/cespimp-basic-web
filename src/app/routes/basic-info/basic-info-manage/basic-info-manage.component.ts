import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BasicInfoService, BasicInfoServiceNs } from '@core/biz-services/basic-info/basic-info.service';
import { GoBackParam } from '@core/vo/comm/ReturnBackVo';
import { STColumn, STData } from '@delon/abc';
import { ListPageInfo, PageTypeEnum } from '@core/vo/comm/BusinessEnum';
import FactoryInfoModel = BasicInfoServiceNs.FactoryInfoModel;
import { MapPipe } from '@shared/directives/pipe/map.pipe';

@Component({
  selector: 'app-basic-info-manage',
  templateUrl: './basic-info-manage.component.html',
  styleUrls: ['./basic-info-manage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoManageComponent implements OnInit {
  pageTypeEnum = PageTypeEnum;
  currentPage: number;
  expandForm: boolean;
  dataList: FactoryInfoModel[];
  columns: STColumn[];
  listPageInfo: ListPageInfo;

  constructor(private dataService: BasicInfoService, private cdr: ChangeDetectorRef) {
    this.expandForm = false;
    this.currentPage = this.pageTypeEnum.List;
    this.columns = [];
    this.listPageInfo = {
      total: 0,
      ps: 10,//每页数量
      pi: 1,// 当前页码
    };
    this.dataList = [];
  }

  goDetail() {
    this.currentPage = this.pageTypeEnum.DetailOrExamine;
  }

  changePage(e) {
    this.listPageInfo = e;
    this.getDataList();
  }


  private initTable(): void {
    this.columns = [
      { title: '企业的中文全称', index: 'entprName', width: 120 },
      { title: '主要负责人', index: 'boss', width: 100 },
      { title: '主要负责人移动电话', index: 'bossMobile', width: 120 },
      {
        title: '经营状态',
        index: 'operatingStatus',
        width: 100,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
      { title: '经济类型', index: 'ecoType', width: 100 },
      { title: '企业规模', index: 'entprScale', width: 100 },
      {
        title: '操作',
        fixed: 'right',
        width: '80px',
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

  format(toBeFormat, arg) {
    return new MapPipe().transform(toBeFormat, arg);
  }

  goEditAddPage(item, modal) {
    this.currentPage = this.pageTypeEnum.AddOrEdit;
  }

  goDetailPage(item, modal) {
    this.currentPage = this.pageTypeEnum.DetailOrExamine;
  }

  async returnToList(e?: GoBackParam) {
    this.currentPage = this.pageTypeEnum.List;
    if (!!e && e.refesh) {
      this.listPageInfo.ps = e.pageNo;
      await this.getDataList(e.pageNo);
    }
  }

  async getDataList(pageNumber?: number) {
    const params = {
      pageNum: pageNumber || this.listPageInfo.pi,
      pageSize: this.listPageInfo.ps,
    };
    const { total, list, pageNum } = await this.dataService.getFactoryList(params);
    this.listPageInfo.total = total;
    this.listPageInfo.pi = pageNum;
    this.dataList = list || [];
    this.cdr.markForCheck();
  }

  ngOnInit() {
    this.initTable();
    this.getDataList();
  }
}
