import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  MajorHazardListInfoService,
  MajorHazardListServiceNs,
} from '@core/biz-services/major-hazard-management/major-hazard-list.service';
import MajorHazardListInfoModel = MajorHazardListServiceNs.MajorHazardListInfoModel;
import { STColumn, STColumnButton, STData } from '@delon/abc';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { MapPipe } from '@shared/directives/pipe/map.pipe';
import { Router } from '@angular/router';
import { EVENT_KEY } from '@env/staticVariable';

enum PartTypeEnum {
  Tank = 1,
  Warehouse,
  ProductionPlace
}

@Component({
  selector: 'app-major-hazard-management-major-hazard-detail',
  templateUrl: './major-hazard-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MajorHazardManagementMajorHazardDetailComponent implements OnInit {
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;
  dataInfo: MajorHazardListInfoModel;
  columns: STColumn[];

  constructor(private http: _HttpClient, private msg: NzMessageService,
              private dataService: MajorHazardListInfoService, private cdr: ChangeDetectorRef,
              private router: Router) {
    this.returnBack = new EventEmitter<any>();
    this.dataInfo = {
      id: -1,
      majorHazardNo: '',
      majorHazardName: '',
      manager: '',
      unitType: -1,
      useDate: new Date(),
      majorHazardLevel: -1,
      majorHazardNature: -1,
      rvalue: -1,
      longitude: null,
      latitude: null,
      locFactory: '',
      managerMobile: '',
      description: '',
      majorHazardUnits: [],
      majorHazardUnitUpdateDTOS: [],
    };

    this.columns = [
      {
        title: '重大危险源组成类型', index: 'partType', width: 60,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
      {
        title: '组成部分编号',
        index: '',
        width: 60,
        buttons: [{ type: 'link', text: '点击跳转', click: this.tableBtnClick.bind(this), format: this.formateData }],
      },
    ];
  }

  formateData(record: STData, btn: STColumnButton) {
    return record.partNo;
  }

  tableBtnClick(record, modal, instance) {
    if (record.partType === PartTypeEnum.Tank) {
      this.router.navigate(['/hazard/storage-tank-management/tank-list']);
      window.sessionStorage.setItem(EVENT_KEY.tankNo, record.partNo);
    }
    if (record.partType === PartTypeEnum.ProductionPlace) {
      this.router.navigate(['/hazard/production-management/production-list']);
      window.sessionStorage.setItem(EVENT_KEY.tankNo, record.partNo);
    }
    if (record.partType === PartTypeEnum.Warehouse) {
      this.router.navigate(['/hazard/storage-tank-management/tank-list']);
      window.sessionStorage.setItem(EVENT_KEY.tankNo, record.partNo);
    }
  }

  returnToList() {
    this.returnBack.emit({ refesh: false, pageNo: this.currentPageNum });
  }

  format(toBeFormat, arg) {
    return new MapPipe().transform(toBeFormat, arg);
  }


  async getDetailInfo(id?) {
    this.dataInfo = await this.dataService.getMajorHazardInfoDetail(id ? id : this.id);
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.getDetailInfo();
  }
}
