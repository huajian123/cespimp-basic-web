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
  WarehouseListInfoService,
  WarehouseListServiceNs,
} from '@core/biz-services/warehouse-management/warehouse-list.service';
import WarehouseListInfoModel = WarehouseListServiceNs.WarehouseListInfoModel;
import { STColumn } from '@delon/abc';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { TankListInfoService, TankListServiceNs } from '@core/biz-services/storage-tank-management/tank-list.service';
import { PositionPickerService } from '../../../widget/position-picker/position-picker.service';
import TankListInfoModel = TankListServiceNs.TankListInfoModel;

@Component({
  selector: 'app-warehouse-management-warehouse-list-detail',
  templateUrl: './warehouse-list-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarehouseManagementWarehouseListDetailComponent implements OnInit {
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;
  dataInfo: WarehouseListInfoModel;
  columns: STColumn[];

  constructor(private http: _HttpClient, private msg: NzMessageService,
              private dataService: WarehouseListInfoService, private cdr: ChangeDetectorRef,
              private positionPickerService: PositionPickerService) {
    this.returnBack = new EventEmitter<any>();

    this.dataInfo = {
      id: -1,
      roomNo: '',
      roomName: '',
      roomForm: -1,
      longitude: -1,
      latitude: -1,
      fireLevel: -1,
      locFactory: '',
      majorHazardMaterials: [],
    };

    this.columns = [
      { title: '品名', index: 'productName', width: 60 },
      { title: 'CAS号', index: 'casNo', width: 60 },
      { title: '临界量（吨）', index: 'criticalMass', width: 60 },
      {
        title: '设计贮存最大量（吨）',
        index: 'maximumReserves',
        width: 60,
      },
    ];
  }

  returnToList() {
    this.returnBack.emit({ refesh: false, pageNo: this.currentPageNum });
  }

  showMap() {
    this.positionPickerService.show({
      isRemoteImage: true,
      longitude: this.dataInfo.longitude,
      latitude: this.dataInfo.latitude,
    }).then().catch(e => e);
  }

  async getDetailInfo() {
    this.dataInfo = await this.dataService.getWarehouseInfoDetail(this.id);
    console.log(this.dataInfo);
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.getDetailInfo();
  }
}
