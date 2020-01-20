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
  MajorHazardRecordListInfoService,
  MajorHazardRecordListServiceNs,
} from '@core/biz-services/major-hazard-management/major-hazard-record.service';
import MajorHazardRecordListInfoModel = MajorHazardRecordListServiceNs.MajorHazardRecordListInfoModel;

@Component({
  selector: 'app-major-hazard-management-major-hazard-record-detail',
  templateUrl: './major-hazard-record-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MajorHazardManagementMajorHazardRecordDetailComponent implements OnInit {
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;
  dataInfo: MajorHazardRecordListInfoModel;

  constructor(private dataService: MajorHazardRecordListInfoService, private cdr: ChangeDetectorRef) {
    this.dataInfo = {
      id: null,
      majorHazardName: '',
      applicationName: '',
      applicationTime: new Date(),
      reviewName: '',
      reviewTime: new Date(),
      reviewExplain: '',
      reviewStatus: null,
    };
    this.returnBack = new EventEmitter<any>();
  }
  async getDetailInfo(){
    this.dataInfo = await this.dataService.getMajorHazardRecordInfoDetail(this.id);
    this.cdr.markForCheck();
  }


  returnBackToList() {
    this.returnBack.emit({refesh: false, pageNo: this.currentPageNum});
  }

  ngOnInit() {
    this.getDetailInfo()
  }
}
