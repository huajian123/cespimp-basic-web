import { Component, OnInit } from '@angular/core';
import { PageTypeEnum } from '@core/vo/comm/BusinessEnum';
import { BasicInfoService } from '@core/biz-services/basic-info/basic-info.service';
import { GoBackParam } from '@core/vo/comm/ReturnBackVo';
import { STColumn } from '@delon/abc';

export interface TankModel {
  id?: number;
  areaNo: string;
  areaName: string;
  areaSize: string;
  dangerousChemicals: string;
  dangerousNum: string;
  geographicInfo: string;
  embankmentSize: string;
  tankNum: string;
  tankDistance: string;
  tankSeqno: string;
  tankName: string;
  tankShape: string;
  tankType: string | number;
  tankMaterial: string;
  designedPressure: string;
  fireLevel: string;
}

export interface PageInfo {
  total: number;
  ps: number; // 当前页码
  pi: number; // 每页数量
}


@Component({
  selector: 'app-basic-info-manage',
  templateUrl: './basic-info-manage.component.html',
  styleUrls: ['./basic-info-manage.component.scss'],
})
export class BasicInfoManageComponent implements OnInit {
  pageTypeEnum = PageTypeEnum;
  currentPage: number;
  expandForm: boolean;
  dataList: TankModel[];
  itemId: number;
  columns: STColumn[];
  listPageInfo: PageInfo;

  constructor(private dataService: BasicInfoService) {
    this.expandForm = false;
    this.currentPage = this.pageTypeEnum.List;
    this.columns = [];
    this.listPageInfo = {
      total: 0,
      pi: 10,
      ps: 1,
    };
  }

  goDetail() {
    this.currentPage = this.pageTypeEnum.DetailOrExamine;
  }


  private initTable(): void {
    this.columns = [
      { title: '储罐区编号', index: 'areaNo', width: 140 },
      { title: '储罐区名称', index: 'areaName', width: 140 },
      { title: '储罐区面积', index: 'areaSize', width: 140 },
      { title: '危化品名称', index: 'dangerousChemicals', width: 140 },
      { title: '危化品数量', index: 'dangerousNum', width: 140 },
      { title: '地理坐标', index: 'geographicInfo', width: 140 },
      { title: '防护堤长宽高', index: 'embankmentSize', width: 140 },
      { title: '储罐个数', index: 'tankNum', width: 140 },
      { title: '罐间最小距离（cm）', index: 'tankDistance', width: 180 },
      { title: '储罐序号', index: 'tankNo', width: 140 },
      { title: '储罐名称', index: 'tankName', width: 140 },
      { title: '储罐形状', index: 'tankShape', width: 140 },
      { title: '储罐形式', index: 'tankType', width: 140 },
      { title: '储罐材质', index: 'tankMaterial', width: 140 },
      { title: '设计压力（kPa）', index: 'designedPressure', width: 140 },
      { title: '火灾危险性等级', index: 'fireLevel', width: 140 },
      {
        title: '操作',
        fixed: 'right',
        width: '240px',
        buttons: [
          {
            text: '编辑',
            icon: 'edit',
            click: this.goEditAddPage.bind(this),
          },
          {
            text: '删除',
            icon: 'delete',
            click: (_record, modal) => 123,
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

  goEditAddPage(item, modal) {
    this.currentPage = this.pageTypeEnum.AddOrEdit;
  }

  goDetailPage(item, modal) {
    this.currentPage = this.pageTypeEnum.DetailOrExamine;
  }

  async returnToList(e?: GoBackParam) {
    this.currentPage = this.pageTypeEnum.List;
    if (!!e && e.refesh) {
      await this.getDataList(e.pageNo);
    }
  }

  async getDataList(pageNumber?: number) {
    const params = {
      pageNum: pageNumber || this.listPageInfo.ps,
      pageSize: 10,
    };
    await this.dataService.getFactoryList(params);
    const { total, list, pageNum } = await this.dataService.getFactoryList(params);
    this.listPageInfo.total = total;
    this.listPageInfo.ps = pageNum;
    this.dataList = list || [];
  }

  ngOnInit() {
    this.initTable();
    this.getDataList();
  }
}
