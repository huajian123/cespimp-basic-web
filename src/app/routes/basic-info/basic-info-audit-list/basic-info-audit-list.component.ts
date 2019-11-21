import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { STColumn, STData } from '@delon/abc';
import { ListPageInfo, PageTypeEnum, RoleEnum } from '@core/vo/comm/BusinessEnum';
import { MapPipe } from '@shared/directives/pipe/map.pipe';
import { GoBackParam } from '@core/vo/comm/ReturnBackVo';
import { BasicInfoAuditService } from '@core/biz-services/basic-info/basic-info-audit-service';

@Component({
  selector: 'app-basic-info-basic-info-audit-list',
  templateUrl: './basic-info-audit-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoBasicInfoAuditListComponent implements OnInit {
  roleEnum = RoleEnum;
  pageTypeEnum = PageTypeEnum;
  currentPage: number;
  expandForm: boolean;
  dataList: any;
  columns: STColumn[];
  listPageInfo: ListPageInfo;
  itemId: number;


  constructor(private dataService: BasicInfoAuditService, private cdr: ChangeDetectorRef) {
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


  private initTable(): void {
    this.columns = [
      { title: '企业名称', index: 'entprName', width: 100 },
      { title: '申请人', index: 'applicationName', width: 100 },
      { title: '申请时间', index: 'applicationTime', width: 120,type:'date' },
      { title: '审核人', index: 'reviewName', width: 100, },
      { title: '审核时间', index: 'reviewTime', width: 100,type:'date' },
      { title: '审核意见', index: 'reviewExplain', width: 100 },
      { title: '审核状态',
        index: 'reviewStatus',
        width: 120,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
      {
        title: '操作',
        fixed: 'right',
        width: '80px',
        buttons: [
         /* {
            text: '审核',
            icon: 'edit',
            click: this.goEditAddPage.bind(this),
          },*/
         /* {
            text: '删除',
            icon: 'delete',
            click: (_record, modal) => 123,
          },*/
          {
            text: '详情',
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
    this.itemId = item.id;
    this.currentPage = this.pageTypeEnum.DetailOrExamine;
  }
  async returnToList(e?: GoBackParam) {
    this.currentPage = this.pageTypeEnum.List;
    if (!!e && e.refesh) {
      this.listPageInfo.pi = e.pageNo;
      await this.getDataList(e.pageNo);
    }
  }

  async getDataList(pageNumber?: number) {
    const params = {
      pageNum: pageNumber || this.listPageInfo.pi,
      pageSize: this.listPageInfo.ps,
    };
    const { total, pageNum, list } = await this.dataService.getFactoryAuditList(params);
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
