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
  constructor(private dataService: WarehouseListInfoService, private cdr: ChangeDetectorRef) {
    this.dataInfo = {
      id: null,
      roomNo: '',
      roomName: '',
      roomArea: null,
      roomForm: null,
      fireLevel: null,
      longitude: null,
      latitude: null,
      locFactory: '',
    };
    this.returnBack = new EventEmitter<any>();
  }
async getDetailInfo(){
  this.dataInfo = await this.dataService.getWarehouseInfoDetail(this.id);
  console.log(this.dataInfo);
  this.cdr.markForCheck();
}


  returnBackToList() {
    this.returnBack.emit({refesh: false, pageNo: this.currentPageNum});
  }

  ngOnInit() {
    this.getDetailInfo()
  }
}
