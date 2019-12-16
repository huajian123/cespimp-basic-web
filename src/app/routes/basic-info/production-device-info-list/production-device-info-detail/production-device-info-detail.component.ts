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
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-info-production-device-info-detail',
  templateUrl: './production-device-info-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoProductionDeviceInfoDetailComponent implements OnInit {
  validateForm: FormGroup;
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;

  constructor(private dataService: ProductionDeviceListInfoService, private cdr: ChangeDetectorRef, private fb: FormBuilder) {
    this.returnBack = new EventEmitter<any>();
  }

  async getDetailInfo() {
    const dataInfo = await this.dataService.getProductionDeviceInfoDetail(this.id);
    this.validateForm.patchValue(dataInfo);
    this.cdr.markForCheck();
  }

  initForm() {
    this.validateForm = this.fb.group({
      deviceNo: [null, []],
      deviceName: [null, []],
      deviceModel: [null, []],
      deviceFunction: [null, []],
    });
  }

  returnBackToList() {
    this.returnBack.emit({ refesh: false, pageNo: this.currentPageNum });
  }

  ngOnInit() {
    this.initForm();
    this.getDetailInfo();
  }

}
