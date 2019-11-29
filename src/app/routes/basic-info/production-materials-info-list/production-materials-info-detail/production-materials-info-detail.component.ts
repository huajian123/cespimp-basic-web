import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EnterpriseOriginalProductService } from '@core/biz-services/basic-info/enterprise-original-products.service';

@Component({
  selector: 'app-basic-info-production-materials-info-detail',
  templateUrl: './production-materials-info-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoProductionMaterialsInfoDetailComponent implements OnInit {
  validateForm: FormGroup;
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;
  constructor(private http: _HttpClient, private msg: NzMessageService, private dataService: EnterpriseOriginalProductService,
              private cdr: ChangeDetectorRef, private fb: FormBuilder) {
    this.returnBack = new EventEmitter<any>();

  }

  returnToList() {
    this.returnBack.emit({ refesh: false, pageNo: this.currentPageNum });
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

  ngOnInit(): void {
    this.initForm();
    this.getDetailInfo();
  }
}
