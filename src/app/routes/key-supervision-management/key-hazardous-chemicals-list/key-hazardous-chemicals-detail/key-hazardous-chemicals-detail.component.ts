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
  HazardousChemicalInfoService,
} from '@core/biz-services/key-supervision-management/key-hazardous-chemicals.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-key-supervision-management-key-hazardous-chemicals-detail',
  templateUrl: './key-hazardous-chemicals-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeySupervisionManagementKeyHazardousChemicalsDetailComponent implements OnInit {
  validateForm: FormGroup;
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;

  constructor(private dataService: HazardousChemicalInfoService, private cdr: ChangeDetectorRef, private fb: FormBuilder) {

    this.returnBack = new EventEmitter<any>();
  }

  async getDetailInfo() {
    const dataInfo = await this.dataService.getHazardousChemicalInfoDetail(this.id);
    this.validateForm.patchValue(dataInfo);
    this.cdr.markForCheck();
  }

  initForm() {
    this.validateForm = this.fb.group({
      productName: [null, []],
      alias: [null, []],
      casNo: [null, []],
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
