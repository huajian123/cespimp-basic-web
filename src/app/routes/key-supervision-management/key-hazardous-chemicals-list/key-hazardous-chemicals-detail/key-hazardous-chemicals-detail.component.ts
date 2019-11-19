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
  HazardousChemicalListServiceNs,
} from '@core/biz-services/key-supervision-management/key-hazardous-chemicals.service';
import HazardousChemicalInfoModel = HazardousChemicalListServiceNs.HazardousChemicalInfoModel;

@Component({
  selector: 'app-key-supervision-management-key-hazardous-chemicals-detail',
  templateUrl: './key-hazardous-chemicals-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeySupervisionManagementKeyHazardousChemicalsDetailComponent implements OnInit {
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;
  dataInfo: HazardousChemicalInfoModel;
  constructor(private dataService: HazardousChemicalInfoService, private cdr: ChangeDetectorRef) {
    this.dataInfo = {
      id: null,
      productName: '',
      alias: '',
      casNo: '',
    };
    this.returnBack = new EventEmitter<any>();
  }

  async getDetailInfo(){
    this.dataInfo = await this.dataService.getHazardousChemicalInfoDetail(this.id);
    this.cdr.markForCheck();
  }


  returnBackToList() {
    this.returnBack.emit({refesh: false, pageNo: this.currentPageNum});
  }

  ngOnInit() {
    this.getDetailInfo()
  }


}
