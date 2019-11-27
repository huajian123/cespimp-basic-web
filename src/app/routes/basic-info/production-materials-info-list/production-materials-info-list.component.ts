import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { STColumn, STData } from '@delon/abc';
import { ListPageInfo, LoginInfoModel, PageTypeEnum, RoleEnum } from '@core/vo/comm/BusinessEnum';
import { MessageType, ShowMessageService } from '../../../widget/show-message/show-message';
import { MapPipe } from '@shared/directives/pipe/map.pipe';
import {
  EnterpriseOriginalProductService,
  EnterpriseOriginalProductServiceNs,
} from '@core/biz-services/basic-info/enterprise-original-products.service';

import EntprProductSearchModel = EnterpriseOriginalProductServiceNs.EntprProductSearchModel;
import EnterpriseProductModel = EnterpriseOriginalProductServiceNs.EnterpriseProductModel;
import { EVENT_KEY } from '@env/staticVariable';

@Component({
  selector: 'app-basic-info-production-materials-info-list',
  templateUrl: './production-materials-info-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoProductionMaterialsInfoListComponent implements OnInit {
  loginInfo: LoginInfoModel;
  roleEnum = RoleEnum;
  pageTypeEnum = PageTypeEnum;
  currentPage: number;
  expandForm: boolean;
  dataList: EnterpriseProductModel[];
  columns: STColumn[];
  listPageInfo: ListPageInfo;
  itemId: number;
  @Input() entprId: number;
  constructor(private dataService: EnterpriseOriginalProductService, private cdr: ChangeDetectorRef,
              private messageService: ShowMessageService) {
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

  // 生产原料信息，中间产品信息，最终产品信息
  async getDataList(currentProductType = 1) {
    const param: EntprProductSearchModel = {
      productType: currentProductType,
      entprId: this.loginInfo.entprId,
      pageNum: this.listPageInfo.pi,
      pageSize: this.listPageInfo.ps,
    };
    const { total, pageNum, list } = await this.dataService.getEnterProduct(param);
    this.listPageInfo.total = total;
    this.listPageInfo.pi = pageNum;
    this.dataList = list || [];
    this.cdr.markForCheck();
  }


  add() {
    this.itemId = null;
    this.currentPage = this.pageTypeEnum.AddOrEdit;
  }

  changePage(e) {
    this.listPageInfo = e;
    this.getDataList();
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
      //this.dataService.delWarehouseInfo(this.itemId).then(() => this.getDataList(1));
    });
  }
  private initTable(): void {
    this.columns = [
      {
        title: '产品类型',
        index: 'productType',
        width: 120,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
      { title: '品名', index: 'productName', width: 100 },
      {
        title: '别名',
        index: 'alias',
        width: 120,
      },
      { title: 'CAS号', index: 'casNo', width: 100 },
      {
        title: '年消耗量（吨）',
        index: 'annualConsumption',
        width: 100,
      },
      { title: '设计贮存最大量（吨）', index: 'maximumReserves', width: 120 },
      {
        title: '操作',
        fixed: 'right',
        width: '130px',
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
