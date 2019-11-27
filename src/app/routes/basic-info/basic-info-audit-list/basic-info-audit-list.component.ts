import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { STColumn, STData } from '@delon/abc';
import { ListPageInfo, LoginInfoModel, PageTypeEnum, RoleEnum } from '@core/vo/comm/BusinessEnum';
import { MapPipe, MapSet } from '@shared/directives/pipe/map.pipe';
import { GoBackParam } from '@core/vo/comm/ReturnBackVo';
import { BasicInfoAuditService, BasicInfoAuditServiceNs } from '@core/biz-services/basic-info/basic-info-audit-service';
import { EVENT_KEY } from '@env/staticVariable';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import BasicInfoAuditModel = BasicInfoAuditServiceNs.BasicInfoAuditModel;

interface OptionsInterface {
  value: string;
  label: string;
}

@Component({
  selector: 'app-basic-info-basic-info-audit-list',
  templateUrl: './basic-info-audit-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoBasicInfoAuditListComponent implements OnInit {
  validateForm: FormGroup;
  isVisible = false;
  roleEnum = RoleEnum;
  pageTypeEnum = PageTypeEnum;
  currentPage: number;
  expandForm: boolean;
  dataList: any;
  columns: STColumn[];
  listPageInfo: ListPageInfo;
  itemId: number;
  statusOptions: OptionsInterface[];
  seacher: BasicInfoAuditModel;
  loginInfo: LoginInfoModel;

  constructor(private fb: FormBuilder,private dataService: BasicInfoAuditService, private cdr: ChangeDetectorRef) {
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
    this.seacher = {
      id: null,
      entprName: '',
      applicationName: '',
      applicationTime: new Date(),
      reviewName: '',
      reviewTime: new Date(),
      reviewExplain: '',
      reviewStatus: null,
    };
    this.listPageInfo = {
      total: 0,
      ps: 10,// 每页数量
      pi: 1,// 当前页码
    };
    this.dataList = [];
    this.itemId = -1;
  }

  /*确认审核*/
  async handleOk(){
    Object.keys(this.validateForm.controls).forEach(key => {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    });

    if (this.validateForm.invalid) return;
    const param = this.validateForm.getRawValue();
    param.id = this.loginInfo.id;
    param.reviewName = this.loginInfo.realName;
    await this.dataService.getIdCardInfoDetail(param);
    this.isVisible = false;
  }

  /*取消审核*/
   handleCancel(): void  {
    this.isVisible = false;
  }

  changePage(e) {
    this.listPageInfo = e;
    this.getDataList();
  }

 goExamine(item) {
    this.isVisible = true;
    this.validateForm.reset();

  }

  private initTable(): void {
    this.columns = [
      { title: '企业名称', index: 'entprName', width: 100 },
      { title: '申请人', index: 'applicationName', width: 100 },
      { title: '申请时间', index: 'applicationTime', width: 120, type: 'date' },
      { title: '审核人', index: 'reviewName', width: 100 },
      { title: '审核时间', index: 'reviewTime', width: 100, type: 'date' },
      { title: '审核意见', index: 'reviewExplain', width: 100 },
      {
        title: '审核状态',
        index: 'reviewStatus',
        width: 120,
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

  initForm() {
    this.validateForm = this.fb.group({
      reviewStatus: [null, [Validators.required]],
      reviewExplain: [null, [Validators.required]],
    });
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
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.statusOptions = [...MapPipe.transformMapToArray(MapSet.reviewStatus)];
    this.statusOptions.shift();
    this.initTable();
    this.getDataList();
    this.initForm();
  }
}
