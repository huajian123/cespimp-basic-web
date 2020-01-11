import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { STColumn, STData } from '@delon/abc';
import { ListPageInfo, PageTypeEnum, RoleEnum } from '@core/vo/comm/BusinessEnum';
import { MapPipe } from '@shared/directives/pipe/map.pipe';
import { GoBackParam } from '@core/vo/comm/ReturnBackVo';
import {
  WarehouseListInfoService,
  WarehouseListServiceNs,
} from '@core/biz-services/warehouse-management/warehouse-list.service';
import WarehouseListInfoModel = WarehouseListServiceNs.WarehouseListInfoModel;
import { MessageType, ShowMessageService } from '../../../widget/show-message/show-message';
import WarehouseSearchModel = WarehouseListServiceNs.WarehouseSearchModel;
import { ActivatedRoute, Params } from '@angular/router';
import { EVENT_KEY } from '@env/staticVariable';

@Component({
  selector: 'app-warehouse-management-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarehouseListComponent implements OnInit {
  roleEnum = RoleEnum;
  pageTypeEnum = PageTypeEnum;
  currentPage: number;
  expandForm: boolean;
  dataList: WarehouseListInfoModel[];
  columns: STColumn[];
  listPageInfo: ListPageInfo;
  itemId: number;
  searchParam: WarehouseSearchModel;

  constructor(private dataService: WarehouseListInfoService, private cdr: ChangeDetectorRef, private messageService: ShowMessageService,
              private activateInfo:ActivatedRoute) {
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
    const { total, list, pageNum } = await this.dataService.getWarehouseList(params);
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

  reset() {
    this.searchParam = {};
  }

  goDeletePage(item, modal) {
    const modalCtrl = this.messageService.showAlertMessage('', '您确定要删除吗？', MessageType.Confirm);
    modalCtrl.afterClose.subscribe((type: string) => {
      if (type !== 'onOk') {
        return;
      }
      this.itemId = item.id;
      this.dataService.delWarehouseInfo(this.itemId).then(() => this.getDataList(1));
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
      { title: '企业名称', index: 'entprName', width: 120, acl: [this.roleEnum[this.roleEnum.ParkManage],this.roleEnum[this.roleEnum.SafeMonitor]] },
      { title: '库房编号', index: 'roomNo', width: 120 },
      { title: '库房名称', index: 'roomName', width: 100 },
      { title: '库房面积', index: 'roomArea', width: 120 },
      {
        title: '库房形式',
        index: 'roomForm',
        width: 100,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
      {
        title: '火灾危险性等级',
        index: 'fireLevel',
        width: 100,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
      {
        title: '投用时间',
        index: 'productionDate',
        width: 140,
        type: 'date',
      },
      { title: '经度', index: 'longitude', width: 100 },
      { title: '纬度', index: 'latitude', width: 100 },
      { title: '在厂区的位置', index: 'locFactory', width: 100 },
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
  routeInit() {
    if (!!window.sessionStorage.getItem(EVENT_KEY.roomNo)) {
      this.searchParam.roomNo = window.sessionStorage.getItem(EVENT_KEY.roomNo);
    }
    window.sessionStorage.removeItem(EVENT_KEY.roomNo);
    this.currentPage = this.pageTypeEnum.List;
    this.getDataList(1);
  }

  _onReuseInit() {
    this.ngOnInit()
  }
  ngOnInit() {
    this.initTable();
    this.routeInit();
  }

}
