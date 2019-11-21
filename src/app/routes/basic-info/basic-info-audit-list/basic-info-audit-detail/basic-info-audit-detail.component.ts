import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BasicInfoAuditService, BasicInfoAuditServiceNs } from '@core/biz-services/basic-info/basic-info-audit-service';
import BasicInfoAuditModel = BasicInfoAuditServiceNs.BasicInfoAuditModel;

@Component({
  selector: 'app-basic-info-basic-info-audit-detail',
  templateUrl: './basic-info-audit-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoBasicInfoAuditDetailComponent implements OnInit {
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;
  dataInfo: BasicInfoAuditModel;
  constructor(private dataService: BasicInfoAuditService, private cdr: ChangeDetectorRef) {
    this.dataInfo = {
      id: null,
      entprName: '',
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
    this.dataInfo = await this.dataService.getBasicInfoAuditInfoDetail(this.id);
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
