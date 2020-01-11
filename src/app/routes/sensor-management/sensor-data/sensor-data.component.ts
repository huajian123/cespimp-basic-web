import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ListPageInfo, PageTypeEnum, RoleEnum } from '@core/vo/comm/BusinessEnum';
import { STColumn, STData } from '@delon/abc';
import {
  SensorManagementListInfoService,
  SensorManagementListServiceNs,
} from '@core/biz-services/sensor-management/sensor-management.service';
import { MessageType, ShowMessageService } from '../../../widget/show-message/show-message';
import { EVENT_KEY } from '@env/staticVariable';
import { MapPipe } from '@shared/directives/pipe/map.pipe';
import { GoBackParam } from '@core/vo/comm/ReturnBackVo';
import SensorManagementListInfoModel = SensorManagementListServiceNs.SensorManagementListInfoModel;
import SensorSearchModel = SensorManagementListServiceNs.SensorSearchModel;
import { addDays, endOfDay, subDays } from 'date-fns';

@Component({
  selector: 'app-sensor-data',
  templateUrl: './sensor-data.component.html',
  styles: [],
})
export class SensorDataComponent implements OnInit {
  roleEnum = RoleEnum;
  pageTypeEnum = PageTypeEnum;
  currentPage: number;
  expandForm: boolean;
  dataList: SensorManagementListInfoModel[];
  columns: STColumn[];
  listPageInfo: ListPageInfo;
  itemId: number;
  searchParam: SensorSearchModel;

  constructor(private dataService: SensorManagementListInfoService, private cdr: ChangeDetectorRef, private messageService: ShowMessageService) {
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


  changeStartSearchDate(e) {
    this.searchParam.endTime = null;
  }

  disabledDate(current: Date) {
    return current.getTime() <= subDays(this.searchParam.beginTime,1).getTime() || endOfDay(current).getTime() >= (addDays(this.searchParam.beginTime, 4).getTime());
  }

  disabledStartDate(current: Date) {
    return current.getTime() < subDays(new Date(),20).getTime();
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
    const { total, list, pageNum } = await this.dataService.getSensorManagementDataList(params);
    this.listPageInfo.total = total;
    this.listPageInfo.pi = pageNum;
    this.dataList = list || [];
    console.log(this.dataList);
    this.cdr.markForCheck();
  }

  add() {
    this.itemId = null;
    this.currentPage = this.pageTypeEnum.AddOrEdit;
  }

  reset() {
    this.searchParam = {};
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
      this.dataService.delSensorInfo(this.itemId).then(() => this.getDataList(1));
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
      {
        title: '企业名称',
        index: 'entprName',
        width: 50,
        acl: [this.roleEnum[this.roleEnum.ParkManage], this.roleEnum[this.roleEnum.SafeMonitor]],
      },
      {
        title: '传感器类型',
        index: 'sensorType',
        width: 50,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
      { title: '传感器编号', index: 'sensorNo', width: 50 },
      { title: '实时数据', index: 'sensorValue', width: 50 },
      { title: '上传时间', index: 'reportTime', width: 50, type: 'date' },
    ];
  }

  ngOnInit() {
    this.initTable();
    this.getDataList();
  }

  _onReuseInit() {
    this.ngOnInit();
  }
}
