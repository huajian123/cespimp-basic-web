import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { EnterpriseOriginalProductService } from '@core/biz-services/basic-info/enterprise-original-products.service';

@Component({
  selector: 'app-basic-info-intermediate-product-info-detail',
  templateUrl: './intermediate-product-info-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoIntermediateProductInfoDetailComponent implements OnInit {
  validateForm: FormGroup;
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;

  constructor(private http: _HttpClient, private msg: NzMessageService, private dataService: EnterpriseOriginalProductService,
              private cdr: ChangeDetectorRef, private fb: FormBuilder) {
    this.returnBack = new EventEmitter<any>();

  }

  initForm() {
    this.validateForm = this.fb.group({
      productName: [null, []],
      alias: [null, []],
      casNo: [null, []],
      annualConsumption: [null, []],
      maximumReserves: [null, []],
    });
  }

  async getDetailInfo() {
    const dataInfo = await this.dataService.getEnterProductInfoDetail(this.id);
    this.validateForm.patchValue(dataInfo);
    this.cdr.markForCheck();
  }

  returnToList() {
    this.returnBack.emit({ refesh: false, pageNo: this.currentPageNum });
  }

  ngOnInit(): void {
    this.initForm();
    this.getDetailInfo();
  }
}
