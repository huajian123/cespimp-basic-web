import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ListPageInfo, PageTypeEnum } from '@core/vo/comm/BusinessEnum';
import { BasicInfoService } from '@core/biz-services/basic-info/basic-info.service';

@Component({
  selector: 'app-major-hazard-management-tank-list',
  templateUrl: './tank-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MajorHazardManagementTankListComponent implements OnInit {
  pageTypeEnum = PageTypeEnum;
  currentPage: number;
  expandForm: boolean;
  /*dataList: FactoryInfoModel[];*/
  columns: STColumn[];
  listPageInfo: ListPageInfo;
  itemId: number;



  constructor(private dataService: BasicInfoService, private cdr: ChangeDetectorRef) {
    this.expandForm = false;
    this.currentPage = this.pageTypeEnum.List;
    this.columns = [];
    this.listPageInfo = {
      total: 0,
      ps: 10,//每页数量
      pi: 1,// 当前页码
    };
    /*this.dataList = [];*/
    this.itemId = -1;
  }

  ngOnInit() { }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}
