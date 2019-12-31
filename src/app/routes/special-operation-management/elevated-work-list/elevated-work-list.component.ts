import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { STColumn, STData } from '@delon/abc';
import { ListPageInfo, LoginInfoModel, PageTypeEnum, RoleEnum } from '@core/vo/comm/BusinessEnum';
import {
  SpecialOperationInfoService,
  SpecialOperationManagementServiceNs,
} from '@core/biz-services/special-operation-management/special-operation-management.service';
import { MapPipe, MapSet } from '@shared/directives/pipe/map.pipe';
import SpecialOperationInfoModel = SpecialOperationManagementServiceNs.SpecialOperationInfoModel;
import SpecialInfoEnum = SpecialOperationManagementServiceNs.SpecialInfoEnum;
import SpecialOperationSearchModel = SpecialOperationManagementServiceNs.SpecialOperationSearchModel;
import SpecialOperationEnumModel = SpecialOperationManagementServiceNs.SpecialOperationEnumModel;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoBackParam } from '@core/vo/comm/ReturnBackVo';
import { EVENT_KEY } from '@env/staticVariable';

interface OptionsInterface {
  value: string;
  label: string;
}

enum statusEnum {
  check = 1//待审核
}

@Component({
  selector: 'app-special-operation-management-elevated-work-list',
  templateUrl: './elevated-work-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialOperationManagementElevatedWorkListComponent implements OnInit {
  roleEnum = RoleEnum;
  isVisible = false;
  validateForm: FormGroup;
  pageTypeEnum = PageTypeEnum;
  currentPage: number;
  expandForm: boolean;
  dataList: SpecialOperationInfoModel[];
  statusOptions: OptionsInterface[];
  columns: STColumn[];
  listPageInfo: ListPageInfo;
  itemId: number;
  searchParam: SpecialOperationSearchModel;
  loginInfo: LoginInfoModel;

  constructor(private dataService: SpecialOperationInfoService, private cdr: ChangeDetectorRef, private fb: FormBuilder) {
    this.expandForm = false;
    this.currentPage = this.pageTypeEnum.List;
    this.columns = [];
    this.loginInfo = {
      createBy: '',
      createTime: new Date(),
      delFlag: null,
      entprId: null,
      id: null,
      mobileTel: '',
      password: '',
      realName: '',
      role: null,
      updateBy: '',
      updateTime: new Date(),
      userName: '',
    };
    this.listPageInfo = {
      total: 0,
      ps: 10,// 每页数量
      pi: 1,// 当前页码
    };
    this.dataList = [];
    this.itemId = -1;
    this.searchParam = {};
  }


  async getDataList(pageNumber?: number) {
    const currentRole = window.sessionStorage.getItem('role');
    let entprId = null;
    if (currentRole === RoleEnum[RoleEnum.Enterprise]) {
      let loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
      entprId = loginInfo.entprId;
    }
    const params: SpecialOperationEnumModel = {
      operationType: SpecialInfoEnum.ElevatedWork,
      pageNum: pageNumber || this.listPageInfo.pi,
      pageSize: this.listPageInfo.ps,
      ...this.searchParam,
      entprId
    };
    const { total, list, pageNum } = await this.dataService.getSpecialOperationList(params);
    this.listPageInfo.total = total;
    this.listPageInfo.pi = pageNum;
    this.dataList = list || [];
    this.cdr.markForCheck();
  }

  changePage(e) {
    if (e.type === 'click' || e.type === 'dblClick') return;
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

  canJudge(record) {
    if (record.reviewStatus == statusEnum.check) {
      return true;
    } else {
      return false;
    }
  }

  private initTable(): void {
    this.columns = [
      { title: '企业名称', index: 'entprName', width: 120, acl: this.roleEnum[this.roleEnum.ParkManage] },
      { title: '作业名称', index: 'operationName', width: 100 },
      { title: '作业地点', index: 'operationPlace', width: 120 },
      { title: '作业内容', index: 'operationContent', width: 100 },
      { title: '申请人', index: 'applicationName', width: 100 },
      { title: '申请时间', index: 'operationStartTime', width: 100, type: 'date' },
      { title: '监护人', index: 'operationEndTime', width: 100 },
      { title: '负责人', index: 'leadingName', width: 100 },
      { title: '作业开始时间', index: 'operationStartTime', width: 100, type: 'date' },
      { title: '作业结束时间', index: 'operationEndTime', width: 100, type: 'date' },
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
        width: '100px',
        buttons: [
          {
            text: '审核',
            icon: 'edit',
            click: this.goExamine.bind(this),
            acl: this.roleEnum[this.roleEnum.Enterprise],
            iif: this.canJudge.bind(this),
            iifBehavior: 'hide',
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

  goExamine(item) {
    this.itemId = item.id;
    this.isVisible = true;
    this.validateForm.reset();

  }


  reset() {
    this.searchParam = {};
  }

  /*确认审核*/
  async handleOk() {
    Object.keys(this.validateForm.controls).forEach(key => {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    });

    if (this.validateForm.invalid) return;
    const param = this.validateForm.getRawValue();
    param.id = this.itemId;
    param.reviewName = this.loginInfo.realName;
    param.reviewTime = this.loginInfo.updateTime;
    await this.dataService.examineSpecialOperation(param);
    this.isVisible = false;
    this.getDataList();
    this.cdr.markForCheck();
  }

  /*取消审核*/
  handleCancel(): void {
    this.isVisible = false;
  }

  async returnToList(e?: GoBackParam) {
    this.currentPage = this.pageTypeEnum.List;
    if (!!e && e.refesh) {
      this.listPageInfo.pi = e.pageNo;
      await this.getDataList(e.pageNo);
    }
  }

  initForm() {
    this.validateForm = this.fb.group({
      reviewStatus: [null, [Validators.required]],
      reviewExplain: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.statusOptions = [...MapPipe.transformMapToArray(MapSet.reviewStatus)];
    this.statusOptions.shift();
    this.initTable();
    this.getDataList();
    this.initForm();
  }

  _onReuseInit() {
    this.ngOnInit();
  }
}
