import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { STColumn, STComponent, STData } from '@delon/abc';
import { ListPageInfo, PageTypeEnum, RoleEnum } from '@core/vo/comm/BusinessEnum';
import {
  SpecialOperationInfoService,
  SpecialOperationManagementServiceNs,
} from '@core/biz-services/special-operation-management/special-operation-management.service';
import SpecialOperationInfoModel = SpecialOperationManagementServiceNs.SpecialOperationInfoModel;
import { MessageType, ShowMessageService } from '../../../widget/show-message/show-message';
import { MapPipe } from '@shared/directives/pipe/map.pipe';

@Component({
  selector: 'app-special-operation-management-hoisting-operation-list',
  templateUrl: './hoisting-operation-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialOperationManagementHoistingOperationListComponent implements OnInit {
  roleEnum = RoleEnum;
  pageTypeEnum = PageTypeEnum;
  currentPage: number;
  expandForm: boolean;
  dataList: SpecialOperationInfoModel[];
  columns: STColumn[];
  listPageInfo: ListPageInfo;
  itemId: number;

  constructor(private dataService: SpecialOperationInfoService, private cdr: ChangeDetectorRef, private messageService: ShowMessageService) {
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

  async getDataList(currentType = 4) {
    const params = {
      operationType: currentType,
      pageNum:  this.listPageInfo.pi,
      pageSize: this.listPageInfo.ps,
    };
    const { total, list, pageNum } = await this.dataService.getSpecialOperationList(params);
    this.listPageInfo.total = total;
    this.listPageInfo.pi = pageNum;
    this.dataList = list || [];
    this.cdr.markForCheck();
  }

  changePage(e) {
    this.listPageInfo = e;
    this.getDataList();
  }
  add() {
    this.itemId = null;
    this.currentPage = this.pageTypeEnum.AddOrEdit;
  }
  format(toBeFormat, arg) {
    return new MapPipe().transform(toBeFormat, arg);
  }
  private initTable(): void {
    this.columns = [
      { title: '企业名称', index: 'entprName', width: 120, acl: this.roleEnum[this.roleEnum.ParkManage] },
      { title: '特种作业类型',
        index: 'operationType',
        width: 120,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey)
      },
      { title: '作业名称', index: 'operationName', width: 100 },
      { title: '作业地点', index: 'operationPlace', width: 120 },
      { title: '作业内容', index: 'operationContent', width: 100 },
      { title: '作业证附件', index: 'operationCertificate', width: 100 },
      { title: '申请人', index: 'applicationName', width: 100 },
      { title: '申请时间', index: 'operationStartTime', width: 100,type:'date'  },
      { title: '监护人', index: 'operationEndTime', width: 100 },
      { title: '负责人', index: 'leadingName', width: 100 },
      { title: '作业开始时间', index: 'operationStartTime', width: 100,type:'date' },
      { title: '作业结束时间', index: 'operationEndTime', width: 100,type:'date' },
      { title: '审核人', index: 'reviewName', width: 100 },
      { title: '审核时间', index: 'reviewTime', width: 100 ,type:'date' },
      { title: '审核意见', index: 'reviewExplain', width: 100 },
      { title: '审核状态',
        index: 'reviewStatus',
        width: 100,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
      {
        title: '操作',
        fixed: 'right',
        width: '100px',
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
  goDetailPage(item, modal) {
    this.itemId = item.id;
    this.currentPage = this.pageTypeEnum.DetailOrExamine;
  }
  goEditAddPage(item, modal) {
    this.itemId = item.id;
    this.currentPage = this.pageTypeEnum.AddOrEdit;
  }

  goDeletePage(item, modal) {
    const modalCtrl = this.messageService.showAlertMessage('', '您确定要删除吗？', MessageType.Confirm);
    modalCtrl.afterClose.subscribe((type: string) => {
      if (type !== 'onOk') {
        return;
      }
      this.itemId = item.id;
      // this.dataService.delWarehouseInfo(this.itemId).then(() => this.getDataList(1));
    });
  }

  ngOnInit() {
    this.initTable();
    this.getDataList();
  }


}
