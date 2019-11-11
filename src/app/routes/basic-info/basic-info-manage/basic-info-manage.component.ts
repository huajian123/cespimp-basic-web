import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PageTypeEnum } from '@core/vo/comm/BusinessEnum';
import { UfastTableNs } from '@shared/ufast-table/ufast-table.component';
import { BasicInfoService } from '@core/biz-services/basic-info/basic-info.service';
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

@Component({
  selector: 'app-basic-info-manage',
  templateUrl: './basic-info-manage.component.html',
  styleUrls: ['./basic-info-manage.component.scss'],
})
export class BasicInfoManageComponent implements OnInit {
  pageTypeEnum = PageTypeEnum;
  currentPage: number;
  expandForm: boolean;
  tableConfig: UfastTableNs.TableConfig;
  @ViewChild('operationTpl', { static: true }) operationTpl: TemplateRef<any>;
  dataList: TankModel[];
  columns: STColumn[] = [
    { title: '储罐区编号', index: 'areaNo', width: 120 },
    { title: '储罐区名称', index: 'areaName', width: 120 },
    { title: '储罐区面积', index: 'areaSize', width: 120 },
    { title: '危化品名称', index: 'dangerousChemicals', width: 120 },
    { title: '危化品数量', index: 'dangerousNum', width: 120 },
    { title: '地理坐标', index: 'geographicInfo', width: 120 },
    { title: '防护堤长宽高', index: 'embankmentSize', width: 120 },
    { title: '储罐个数', index: 'tankNum', width: 120 },
    { title: '罐间最小距离（cm）', index: 'tankDistance', width: 120 },
    { title: '储罐序号', index: 'tankNo', width: 120 },
    { title: '储罐名称', index: 'tankName', width: 120 },
    { title: '储罐形状', index: 'tankShape', width: 120 },
    { title: '储罐形式', index: 'tankType', width: 120 },
    { title: '储罐材质', index: 'tankMaterial', width: 120 },
    { title: '设计压力（kPa）', index: 'designedPressure', width: 120 },
    { title: '火灾危险性等级', index: 'fireLevel', width: 120 },
    {
      title: '操作',
      buttons: [
        {
          text: 'Edit',
          icon: 'edit',
          click: (_record, modal) => 123,
        },
        {
          text: 'Edit',
          icon: 'edit',
          click: (_record, modal) => 123,
        },
      ],
    },
  ];
  constructor(private dataService: BasicInfoService) {
    this.expandForm = false;
    this.currentPage = this.pageTypeEnum.List;
  }

  goDetail() {
    this.currentPage = this.pageTypeEnum.DetailOrExamine;
  }


  private initTable(): void {
    this.tableConfig = {
      pageSize: 10,
      pageNum: 1,
      showCheckbox: false,
      checkRowField: '_checked',
      showPagination: true,
      checkAll: false,
      total: 31,
      loading: false,
      headers: [

        {
          title: '储罐区编号',
          width: 140,
          field: 'areaNo',
          fixed: true,
        },
        {
          title: '储罐区名称',
          field: 'areaName',
          width: 100,
        },
        {
          title: '储罐区面积',
          field: 'areaSize',
          width: 100,
        },
        {
          title: '危化品名称',
          field: 'dangerousChemicals',
          width: 100,
        },
        {
          title: '危化品数量',
          field: 'dangerousNum',
          width: 100,
        },
        {
          title: '地理坐标',
          field: 'geographicInfo',
          width: 100,
        },
        {
          title: '防护堤长宽高',
          field: 'embankmentSize',
          width: 120,
        },
        {
          title: '储罐个数',
          field: 'tankNum',
          width: 100,
        },
        {
          title: '罐间最小距离（cm）',
          field: 'tankDistance',
          width: 160,
        },
        {
          title: '储罐序号',
          field: 'tankNo',
          width: 100,
        },
        {
          title: '储罐名称',
          field: 'tankName',
          width: 100,
        },
        {
          title: '储罐形状',
          field: 'tankShape',
          width: 100,
        },
        {
          title: '储罐形式1',
          field: 'tankType',
          width: 100,
          pipe: 'tankType',
        },
        {
          title: '储罐材质',
          field: 'tankMaterial',
          width: 100,
        },
        {
          title: '设计压力（kPa）111',
          field: 'designedPressure',
          width: 150,
        },
        {
          title: '火灾危险性等级',
          field: 'fireLevel',
          pipe: 'fireLevelType',
          width: 120,
        },
        {
          fixed: true,
          title: '操作',
          tdTemplate: this.operationTpl,
          width: 150,
        },
      ],
    };
  }

  async getDataList(pageNumber?: number) {
    const params = {
      pageNum: pageNumber || this.tableConfig.pageNum,
      pageSize: this.tableConfig.pageSize,
      filters: {},
    };
    await this.dataService.getFactoryList(params);
    const { total, list, pageNum } = await this.dataService.getFactoryList(params);
    this.tableConfig.total = total;
    this.tableConfig.pageNum = pageNum;
    this.dataList = list || [];
  }

  ngOnInit() {
   // this.goDetail();
    this.initTable();
    this.getDataList();
  }

}
