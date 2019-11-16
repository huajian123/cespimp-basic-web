import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TankListInfoService, TankListServiceNs } from '@core/biz-services/storage-tank-management/tank-list.service';
import TankListInfoModel = TankListServiceNs.TankListInfoModel;


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
  constructor(private dataService: TankListInfoService, private cdr: ChangeDetectorRef) {
    this.dataInfo = {
      id: null,
      tankNo: '',
      tankName: '',
      tankType: null,
      tankForm: null,
      tankStructure: null,
      longitude: null,
      latitude: null,
      tankMate: null,
      tamkCapacity: null,
      productionDate: new Date,
      locFactory: '',
    };
    this.returnBack = new EventEmitter<any>();
  }
  async getDetailInfo(){
    this.dataInfo = await this.dataService.getTankInfoDetail(this.id);
    this.cdr.markForCheck();
  }


  returnBackToList() {
    this.returnBack.emit({refesh: false, pageNo: this.currentPageNum});
  }

  ngOnInit() {
    this.getDetailInfo()
  }

}
