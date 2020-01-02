import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { STColumn, STData } from '@delon/abc';
import { ListPageInfo, LoginInfoModel, OptionsInterface, PageTypeEnum, RoleEnum } from '@core/vo/comm/BusinessEnum';
import {
  MajorHazardRecordListInfoService,
  MajorHazardRecordListServiceNs,
} from '@core/biz-services/major-hazard-management/major-hazard-record.service';
import MajorHazardRecordListInfoModel = MajorHazardRecordListServiceNs.MajorHazardRecordListInfoModel;
import { MapPipe, MapSet } from '@shared/directives/pipe/map.pipe';
import { GoBackParam } from '@core/vo/comm/ReturnBackVo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EVENT_KEY } from '@env/staticVariable';
import FiltersInfoModel = MajorHazardRecordListServiceNs.FiltersInfoModel;
import EntprSearch = MajorHazardRecordListServiceNs.EntprSearch;

@Component({
  selector: 'app-major-hazard-management-major-hazard-record-list',
  templateUrl: './major-hazard-record-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MajorHazardManagementMajorHazardRecordListComponent implements OnInit {
  validateForm: FormGroup;
  isVisible = false;
  roleEnum = RoleEnum;
  pageTypeEnum = PageTypeEnum;
  currentPage: number;
  expandForm: boolean;
  dataList: MajorHazardRecordListInfoModel[];
  columns: STColumn[];
  listPageInfo: ListPageInfo;
  statusOptions: OptionsInterface[];
  seacher: MajorHazardRecordListInfoModel;
  loginInfo: LoginInfoModel;
  itemId: number;
  filters: FiltersInfoModel;

  constructor(private fb: FormBuilder, private dataService: MajorHazardRecordListInfoService, private cdr: ChangeDetectorRef) {
    this.filters = {};
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
    this.seacher = {
      id: null,
      majorHazardId: '',
      applicationName: '',
      applicationTime: new Date(),
      reviewName: '',
      reviewTime: new Date(),
      reviewExplain: null,
      reviewStatus: null,
    };
  }

  changePage(e) {
    if (e.type === 'click' || e.type === 'dblClick') return;
    this.listPageInfo = e;
    this.getDataList();
  }

  async getDataList(pageNumber?: number) {
    const currentRole = window.sessionStorage.getItem('role');
    let entprId = null;
    if (currentRole === RoleEnum[RoleEnum.Enterprise]) {
      let loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
      entprId = loginInfo.entprId;
    }
    const params: EntprSearch = {
      pageNum: pageNumber || this.listPageInfo.pi,
      pageSize: this.listPageInfo.ps,
      ...this.filters,
      entprId,
    };


    const { total, list, pageNum } = await this.dataService.getMajorHazardRecordList(params);
    this.listPageInfo.total = total;
    this.listPageInfo.pi = pageNum;
    this.dataList = list || [];
    this.cdr.markForCheck();
  }

  format(toBeFormat, arg) {
    return new MapPipe().transform(toBeFormat, arg);
  }

  goExamine(item) {
    this.isVisible = true;
    this.validateForm.reset();

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

  /*确认审核*/
  async handleOk() {
    Object.keys(this.validateForm.controls).forEach(key => {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    });

    if (this.validateForm.invalid) return;
    const param = this.validateForm.getRawValue();
    param.id = this.loginInfo.id;
    param.reviewName = this.loginInfo.realName;
    await this.dataService.getMajorHazardRecord(param);
    this.isVisible = false;
  }

  /*重置*/
  resetSearchParam() {
    this.filters = {};
  }

  /*取消审核*/
  handleCancel(): void {
    this.isVisible = false;
  }

  initForm() {
    this.validateForm = this.fb.group({
      reviewStatus: [null, [Validators.required]],
      reviewExplain: [null, [Validators.required]],
    });
  }

  private initTable(): void {
    this.columns = [
      { title: '企业名称', index: 'entprName', width: 120, acl: this.roleEnum[this.roleEnum.ParkManage] },
      { title: '重大危险源ID', index: 'majorHazardId', width: 100 },
      { title: '申请人', index: 'applicationName', width: 100 },
      { title: '申请时间', index: 'applicationTime', width: 100, type: 'date' },
      { title: '审核人', index: 'reviewName', width: 100 },
      { title: '审核时间', index: 'reviewTime', width: 100, type: 'date' },
      { title: '审核意见', index: 'reviewExplain', width: 100 },
      {
        title: '审核状态',
        index: 'reviewStatus',
        width: 100,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
      {
        title: '操作',
        fixed: 'right',
        width: '130px',
        buttons: [
          {
            text: '审核',
            icon: 'edit',
            click: this.goExamine.bind(this),
            acl: this.roleEnum[this.roleEnum.ParkManage],
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
    this.initForm();
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.statusOptions = [...MapPipe.transformMapToArray(MapSet.reviewStatus)];
    this.statusOptions.shift();
    this.initTable();
    this.getDataList();
  }

  _onReuseInit() {
    this.ngOnInit();
  }
}
