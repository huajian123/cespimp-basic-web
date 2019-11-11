import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BasicInfoService, BasicInfoServiceNs } from '@core/biz-services/basic-info/basic-info.service';
import { NzMessageService, NzTabChangeEvent } from 'ng-zorro-antd';
import FactoryInfoModel = BasicInfoServiceNs.FactoryInfoModel;
import { UfastTableNs } from '@shared/ufast-table/ufast-table.component';
import { STColumn } from '@delon/abc';
import { ListPageInfo } from '@core/vo/comm/BusinessEnum';


enum TabEnum {
  BaseInfoTab,
  PositionTab,
  IdCardTab,
  EnterpriseEnvirTab,
  MateriProductionTab,
  MidProductTab,
  FinalProductTab
}

@Component({
  selector: 'app-basic-info-detail',
  templateUrl: './basic-info-detail.component.html',
  styleUrls: ['./basic-info-detail.component.scss'],
})
export class BasicInfoDetailComponent implements OnInit {
  @Output() returnBack: EventEmitter<any>;
  @Input() currentPageNum: number;
  list: any[] = [];
  dataInfo: FactoryInfoModel;
  showImgUrl: string;
  isShowPreviewModal: boolean;
  dataList: any[];
  columns: STColumn[];
  tableConfig: UfastTableNs.TableConfig;
  @ViewChild('operationTpl', { static: true }) operationTpl: TemplateRef<any>;
  tabEnum = TabEnum;
  currentTab: number;
  listPageInfo: ListPageInfo;

  constructor(private dataService: BasicInfoService, private msg: NzMessageService, private cdr: ChangeDetectorRef) {
    this.returnBack = new EventEmitter<any>();
    this.dataInfo = {
      id: -1,
      enterpriseName: '',
      area: '',
      businessLicense: '',
      nature: '',
      industry: '',
      address: '',
      contacts: '',
      telephone: '',
      legalPerson: '',
      scale: '',
      planeLayout: '',
      environment: '',
      longitude: -1,
      latitude: -1,
    };
    this.showImgUrl = '';
    this.isShowPreviewModal = false;
    this.currentTab = this.tabEnum.BaseInfoTab;
    this.columns = [];
    this.listPageInfo = {
      total: 0,
      pi: 10,
      ps: 1,
    };
  }


  change(args: NzTabChangeEvent) {
    this.currentTab = args.index;
  }

  public showPreviewModal(imgType) {
    this.showImgUrl = this.dataInfo[imgType];
    this.isShowPreviewModal = true;
  }

  returnBackToList() {
    this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });
  }

  private initTable(): void {
    this.columns = [
      { title: '储罐区编号', index: 'areaNo', width: 140 },
      { title: '储罐区名称', index: 'areaName', width: 140 },
      { title: '储罐区面积', index: 'areaSize', width: 140 },
      { title: '危化品名称', index: 'dangerousChemicals', width: 140 },
      { title: '危化品数量', index: 'dangerousNum', width: 140, renderTitle: '' },
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
    ];
  }

  async getFactoryInfo() {
    this.dataInfo = await this.dataService.getFactoryInfoModel();
    this.cdr.markForCheck();
  }

  /*  private initTable(): void {
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
            title: '周边环境类型',
            width: 140,
            field: 'areaNo',
            fixed: true,
          },
          {
            title: '周边环境名称',
            field: 'areaName',
            width: 100,
          },
          {
            title: '周边环境方位',
            field: 'areaSize',
            width: 100,
          },
          {
            title: '与本企业最小距离（米）',
            field: 'dangerousChemicals',
            width: 170,
          },
          {
            title: '建筑结构',
            field: 'dangerousNum',
            width: 100,
          },
          {
            title: '相邻建筑高度（米）',
            field: 'geographicInfo',
            width: 140,
          },
          {
            title: '人员数量（人）',
            field: 'embankmentSize',
            width: 120,
          },
          {
            title: '联系人',
            field: 'tankNum',
            width: 100,
          },
          {
            title: '联系人移动电话',
            field: 'tankDistance',
            width: 160,
          },
          {
            title: '经度',
            field: 'tankNo',
            width: 100,
          },
          {
            title: '纬度',
            field: 'tankName',
            width: 100,
          },
        ],
      };
    }*/

  async getDataList(pageNumber?: number) {
    /*    const params = {
          pageNum: pageNumber || this.tableConfig.pageNum,
          pageSize: this.tableConfig.pageSize,
          filters: {},
        };
        await this.dataService.getFactoryList(params);
        const { total, list, pageNum } = await this.dataService.getFactoryList(params);
        this.tableConfig.total = total;
        this.tableConfig.pageNum = pageNum;
        this.dataList = list || [];*/
    this.dataList = [
      {
        areaNo: '住宅区',
        areaName: '环境名称',
        areaSize: '东',
        dangerousChemicals: '45',
        dangerousNum: '混合结构',
        geographicInfo: '14',
        embankmentSize: '12',
        tankNum: '张三',
        tankDistance: '15151525754',
        tankNo: '38.121',
        tankName: '122.54',
      },
      {
        areaNo: '住宅区',
        areaName: '环境名称',
        areaSize: '东',
        dangerousChemicals: '45',
        dangerousNum: '混合结构',
        geographicInfo: '14',
        embankmentSize: '12',
        tankNum: '张三',
        tankDistance: '15151525754',
        tankNo: '38.121',
        tankName: '122.54',
      }, {
        areaNo: '住宅区',
        areaName: '环境名称',
        areaSize: '东',
        dangerousChemicals: '45',
        dangerousNum: '混合结构',
        geographicInfo: '14',
        embankmentSize: '12',
        tankNum: '张三',
        tankDistance: '15151525754',
        tankNo: '38.121',
        tankName: '122.54',
      },
    ];
  }

  ngOnInit(): void {
    this.initTable();
    this.getFactoryInfo();
    this.getDataList(1);
  }
}
