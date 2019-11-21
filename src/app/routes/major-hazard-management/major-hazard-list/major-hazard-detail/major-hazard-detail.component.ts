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
  MajorHazardListInfoService,
  MajorHazardListServiceNs,
} from '@core/biz-services/major-hazard-management/major-hazard-list.service';
import MajorHazardListInfoModel = MajorHazardListServiceNs.MajorHazardListInfoModel;

@Component({
  selector: 'app-major-hazard-management-major-hazard-detail',
  templateUrl: './major-hazard-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MajorHazardManagementMajorHazardDetailComponent implements OnInit {
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;
  dataInfo: MajorHazardListInfoModel;
  constructor(private dataService: MajorHazardListInfoService, private cdr: ChangeDetectorRef) {
    this.dataInfo = {
      id: null,
      majorHazardNo: '',
      majorHazardName: '',
      manager: '',
      unitType: null,
      useDate: new Date(),
      majorHazardLevel: null,
      majorHazardNature: null,
      rvalue: null,
      managerMobile: '',
      description: '',
    };
    this.returnBack = new EventEmitter<any>();
  }

  async getDetailInfo(){
    this.dataInfo = await this.dataService.getMajorHazardInfoDetail(this.id);
    this.cdr.markForCheck();
  }

  returnBackToList() {
    this.returnBack.emit({refesh: false, pageNo: this.currentPageNum});
  }

  ngOnInit() {
    this.getDetailInfo()
  }


}
