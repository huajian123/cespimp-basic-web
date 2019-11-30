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
  HazardousChemicalProcessesInfoService,
} from '@core/biz-services/key-supervision-management/hazardous-chemical-processes.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-key-supervision-management-hazardous-chemical-processes-detail',
  templateUrl: './hazardous-chemical-processes-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeySupervisionManagementHazardousChemicalProcessesDetailComponent implements OnInit {
  validateForm: FormGroup;
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;


  constructor(private dataService: HazardousChemicalProcessesInfoService, private cdr: ChangeDetectorRef, private fb: FormBuilder) {
    this.returnBack = new EventEmitter<any>();
  }

  initForm() {
    this.validateForm = this.fb.group({
      processName: [null, []],
    });
  }

  async getDetailInfo() {
    const dataInfo = await this.dataService.getHazardousChemicalProcessesInfoDetail(this.id);
    this.validateForm.patchValue(dataInfo);
    this.cdr.markForCheck();
  }


  returnBackToList() {
    this.returnBack.emit({ refesh: false, pageNo: this.currentPageNum });
  }

  ngOnInit() {
    this.initForm();
    this.getDetailInfo();
  }

}
