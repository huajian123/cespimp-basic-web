import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { STColumn, STData } from '@delon/abc';
import { ListPageInfo, LoginInfoModel, PageTypeEnum, RoleEnum } from '@core/vo/comm/BusinessEnum';
import {
  MajorHazardListInfoService,
  MajorHazardListServiceNs,
} from '@core/biz-services/major-hazard-management/major-hazard-list.service';
import MajorHazardListInfoModel = MajorHazardListServiceNs.MajorHazardListInfoModel;
import { MapPipe } from '@shared/directives/pipe/map.pipe';
import { GoBackParam } from '@core/vo/comm/ReturnBackVo';
import { MessageType, ShowMessageService } from '../../../widget/show-message/show-message';
import MajorHazardSearchModel = MajorHazardListServiceNs.MajorHazardSearchModel;
import { EVENT_KEY } from '@env/staticVariable';

enum statusEnum {
  check = null//待备案
}

@Component({
  selector: 'app-major-hazard-management-major-hazard-list',
  templateUrl: './major-hazard-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MajorHazardManagementMajorHazardListComponent implements OnInit {
  roleEnum = RoleEnum;
  pageTypeEnum = PageTypeEnum;
  currentPage: number;
  expandForm: boolean;
  dataList: MajorHazardListInfoModel[];
  columns: STColumn[];
  listPageInfo: ListPageInfo;
  itemId: number;
  searchParam: MajorHazardSearchModel;
  loginInfo: LoginInfoModel;

  constructor(private dataService: MajorHazardListInfoService, private cdr: ChangeDetectorRef, private messageService: ShowMessageService) {
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
    this.searchParam = {};
  }

  changePage(e) {
    if (e.type === 'click' || e.type === 'dblClick') return;
    this.listPageInfo = e;
    this.getDataList();
  }

  async getDataList(pageNumber?: number) {
    const currentRole = window.sessionStorage.getItem('role');
    const params = {
      pageNum: pageNumber || this.listPageInfo.pi,
      pageSize: this.listPageInfo.ps,
      ...this.searchParam,
      entprId: null,
    };
    if (currentRole === RoleEnum[RoleEnum.Enterprise]) {
      let loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
      params.entprId = loginInfo.entprId;
    } else {
      delete params.entprId;
    }

    const { total, list, pageNum } = await this.dataService.getMajorHazardList(params);
    this.listPageInfo.total = total;
    this.listPageInfo.pi = pageNum;
    this.dataList = list || [];
    this.cdr.markForCheck();
  }

  add() {
    this.itemId = null;
    this.currentPage = this.pageTypeEnum.AddOrEdit;
  }

  format(toBeFormat, arg) {
    return new MapPipe().transform(toBeFormat, arg);
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
      this.dataService.delMajorHazard(this.itemId).then(() => this.getDataList(1));
      this.cdr.markForCheck();
    });
  }

  reset() {
    this.searchParam = {};
  }

  async returnToList(e?: GoBackParam) {
    this.currentPage = this.pageTypeEnum.List;
    if (!!e && e.refesh) {
      this.listPageInfo.pi = e.pageNo;
      await this.getDataList(e.pageNo);
    }
  }

  canJudge(record) {
    if (record.reviewStatus == statusEnum.check) {
      return true;
    } else {
      return false;
    }
  }

  /*提交备案*/
  goRecord(item) {
    this.itemId = item.id;
    const modalCtrl = this.messageService.showAlertMessage('', '确认备案信息，并提交到监管部门审核！', MessageType.Confirm);
    modalCtrl.afterClose.subscribe((type: string) => {
      if (type !== 'onOk') {
        return;
      }
      const param = {
        entprId: this.loginInfo.entprId,
        applicationName: this.loginInfo.realName,
        majorHazardId: this.itemId,
      };
      this.dataService.getRecordInfo(param).then(() => this.getDataList(1));
      this.cdr.markForCheck();
    });
  }

  private initTable(): void {
    this.columns = [
      { title: '企业名称', index: 'entprName', width: 120, acl: this.roleEnum[this.roleEnum.ParkManage] },
      { title: '重大危险源编号', index: 'majorHazardNo', width: 120 },
      { title: '重大危险源名称', index: 'majorHazardName', width: 100 },
      {
        title: '单元类型',
        index: 'unitType',
        width: 120,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
      { title: '投用时间', index: 'useDate', width: 100, type: 'date' },
      { title: '在厂区的位置', index: 'locFactory', width: 100 },
      { title: 'R值', index: 'rvalue', width: 100 },
      {
        title: '重大危险源等级',
        index: 'majorHazardLevel',
        width: 100,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
      {
        title: '重大危险源性质',
        index: 'majorHazardNature',
        width: 100,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
      { title: '重大危险源管理员', index: 'manager', width: 100 },
      { title: '管理员联系电话', index: 'managerMobile', width: 100 },
      { title: '重大危险源描述', index: 'description', width: 100 },
      {
        title: '审核状态',
        index: 'reviewStatus',
        width: 100,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
      {
        title: '操作',
        fixed: 'right',
        width: '160px',
        buttons: [
          {
            text: '编辑',
            icon: 'edit',
            click: this.goEditAddPage.bind(this),
          },
          {
            text: '删除',
            icon: 'delete',
            click: this.goDeletePage.bind(this),
          },
          {
            text: '查看',
            icon: 'eye',
            click: this.goDetailPage.bind(this),
          },
          {
            text: '备案',
            icon: 'check',
            click: this.goRecord.bind(this),
            acl: this.roleEnum[this.roleEnum.Enterprise],
            iif: this.canJudge.bind(this),
            iifBehavior: 'hide',
          },
        ],
      },
    ];
  }

  ngOnInit() {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.initTable();
    this.getDataList();
  }

}
