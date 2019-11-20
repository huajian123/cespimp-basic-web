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
  HazardousChemicalProcessesListServiceNs,
} from '@core/biz-services/key-supervision-management/hazardous-chemical-processes.service';
import HazardousChemicalProcessesInfoModel = HazardousChemicalProcessesListServiceNs.HazardousChemicalProcessesInfoModel;



@Component({
  selector: 'app-key-supervision-management-hazardous-chemical-processes-detail',
  templateUrl: './hazardous-chemical-processes-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeySupervisionManagementHazardousChemicalProcessesDetailComponent implements OnInit {
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;
  dataInfo: HazardousChemicalProcessesInfoModel;

  constructor(private dataService: HazardousChemicalProcessesInfoService, private cdr: ChangeDetectorRef) {
    this.dataInfo = {
      id: null,
      processName: '',
    };
    this.returnBack = new EventEmitter<any>();
  }

  async getDetailInfo(){
    this.dataInfo = await this.dataService.getHazardousChemicalProcessesInfoDetail(this.id);
    this.cdr.markForCheck();
  }


  returnBackToList() {
    this.returnBack.emit({refesh: false, pageNo: this.currentPageNum});
  }

  ngOnInit() {
    this.getDetailInfo()
  }

}
