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
  ProductionDeviceInfoListServiceNs,
  ProductionDeviceListInfoService,
} from '@core/biz-services/basic-info/production-device-info.service';
import ProductionDeviceListInfoModel = ProductionDeviceInfoListServiceNs.ProductionDeviceListInfoModel;

@Component({
  selector: 'app-basic-info-production-device-info-detail',
  templateUrl: './production-device-info-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoProductionDeviceInfoDetailComponent implements OnInit {
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;
  dataInfo: ProductionDeviceListInfoModel;
  constructor(private dataService: ProductionDeviceListInfoService, private cdr: ChangeDetectorRef) {
    this.dataInfo = {
      id: null,
      deviceNo: '',
      deviceName: '',
      deviceModel: '',
      deviceFunction: '',
    };
    this.returnBack = new EventEmitter<any>();
  }

  async getDetailInfo(){
    this.dataInfo = await this.dataService.getProductionDeviceInfoDetail(this.id);
    this.cdr.markForCheck();
  }


  returnBackToList() {
    this.returnBack.emit({refesh: false, pageNo: this.currentPageNum});
  }

  ngOnInit() {
    this.getDetailInfo()
  }

}
