import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STData } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { GoBackParam } from '@core/vo/comm/ReturnBackVo';
import { MessageType, ShowMessageService } from '../../../widget/show-message/show-message';
import { MapPipe } from '@shared/directives/pipe/map.pipe';
import { ListPageInfo, PageTypeEnum, RoleEnum } from '@core/vo/comm/BusinessEnum';
import { AlarmListService, AlarmListServiceNs } from '@core/biz-services/alarm-management/alarm-list.service';
import AlarmModel = AlarmListServiceNs.AlarmModel;

@Component({
  selector: 'app-alarm-management-historical-alarm-list',
  templateUrl: './historical-alarm-list.component.html',
})
export class AlarmManagementHistoricalAlarmListComponent implements OnInit {
  roleEnum = RoleEnum;
  pageTypeEnum = PageTypeEnum;
  currentPage: number;
  expandForm: boolean;
  dataList: AlarmModel[];
  columns: STColumn[];
  listPageInfo: ListPageInfo;
  itemId: number;

  constructor(private dataService: AlarmListService, private cdr: ChangeDetectorRef, private messageService: ShowMessageService) {
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

  /*  goDetail() {
      this.currentPage = this.pageTypeEnum.DetailOrExamine;
    }*/

  changePage(e) {
    if (e.type === 'click' || e.type === 'dblClick') return;
    this.listPageInfo = e;
    this.getDataList();
  }


  private initTable(): void {
    this.columns = [
      { title: '企业名称', index: 'entprName', width: 120 },
      {
        title: '报警类型', index: 'alarmType', width: 100,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
      { title: '报警内容', index: 'alarmContent', width: 120 },
      {
        title: '报警开始时间',
        index: 'alarmStartTime',
        width: 100,
        type: 'date',
      },
      {
        title: '报警结束时间',
        index: 'alarmEndTime',
        width: 100,
        type: 'date',
      },
      {
        title: '报警状态',
        index: 'alarmStatus',
        width: 100,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
      { title: '处理人', index: 'handleName', width: 120 },
      { title: '处理时间', index: 'handleTime', width: 100, type: 'date' },
      { title: '处理结果', index: 'handleResult', width: 120 },
      /*  {
          title: '操作',
          fixed: 'right',
          width: '80px',
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
        },*/
    ];
  }

  add() {
    this.itemId = null;
    this.currentPage = this.pageTypeEnum.AddOrEdit;
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

  goDeletePage(item, modal) {
    const modalCtrl = this.messageService.showAlertMessage('', '您确定要删除吗？', MessageType.Confirm);
    modalCtrl.afterClose.subscribe((type: string) => {
      if (type !== 'onOk') {
        return;
      }
      this.itemId = item.id;
      //this.dataService.delProductionInfo(this.itemId).then(() => this.getDataList(1));
    });
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
    const { total, pageNum, list } = await this.dataService.getAlarmList(params);
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
