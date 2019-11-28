import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import {
  EnterpriseSurroundingInfoService,
} from '@core/biz-services/basic-info/enterprise-surrounding-info.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MapPipe } from '@shared/directives/pipe/map.pipe';


@Component({
  selector: 'app-basic-info-enterprise-surrounding-info-detail',
  templateUrl: './enterprise-surrounding-info-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoEnterpriseSurroundingInfoDetailComponent implements OnInit {
  validateForm: FormGroup;
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;

  constructor(private http: _HttpClient, private msg: NzMessageService, private dataService: EnterpriseSurroundingInfoService,
              private cdr: ChangeDetectorRef, private fb: FormBuilder) {
    this.returnBack = new EventEmitter<any>();

  }


  returnToList() {
    this.returnBack.emit({ refesh: false, pageNo: this.currentPageNum });
  }


  initForm() {
    this.validateForm = this.fb.group({
      envrType: [null, []],
      envrName: [null, []],
      envrDirection: [null, []],
      miniDistance: [null, []],
      buildStruct: [null, []],
      adjacentBuildHeight: [null, []],
      personNum: [null, []],
      envrContacts: [null, []],
      contactMoble: [null, []],
    });
  }

  async getDetailInfo() {
    const dataInfo = await this.dataService.getEnterpriseInfoDetail(this.id);
    dataInfo.envrType = new MapPipe().transform(dataInfo.envrType, 'envrType');
    dataInfo.envrDirection = new MapPipe().transform(dataInfo.envrDirection, 'envrDirection');
    dataInfo.buildStruct = new MapPipe().transform(dataInfo.buildStruct, 'buildStruct');
    this.validateForm.patchValue(dataInfo);
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.initForm();
    this.getDetailInfo();
  }
}
