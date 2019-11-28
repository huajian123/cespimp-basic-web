import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { STColumn, STData } from '@delon/abc';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { TankListInfoService, TankListServiceNs } from '@core/biz-services/storage-tank-management/tank-list.service';
import TankListInfoModel = TankListServiceNs.TankListInfoModel;
import { PositionPickerService } from '../../../widget/position-picker/position-picker.service';


@Component({
  selector: 'app-storage-tank-management-tank-list-detail',
  templateUrl: './tank-list-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorageTankManagementTankListDetailComponent implements OnInit {
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;
  dataInfo: TankListInfoModel;
  columns: STColumn[];

  constructor(private http: _HttpClient, private msg: NzMessageService,
              private dataService: TankListInfoService, private cdr: ChangeDetectorRef,
              private positionPickerService: PositionPickerService) {
    this.returnBack = new EventEmitter<any>();

    this.dataInfo = {
      id: -1,
      tankNo: '',
      tankType: -1,
      tankForm: -1,
      tankStructure: -1,
      longitude: -1,
      latitude: -1,
      tankMate: -1,
      tankCapacity: -1,
      productionDate: new Date(),
      locFactory: '',
      majorHazardMaterialInsertDTOS: [],
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

  async getDetailInfo(id?) {
    this.dataInfo = await this.dataService.getTankInfoDetail(id ? id : this.id);
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.getDetailInfo();
  }
}
