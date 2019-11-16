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
  ProductionListInfoService,
  ProductionListServiceNs,
} from '@core/biz-services/production-management/production-list.service';
import ProductionListInfoModel = ProductionListServiceNs.ProductionListInfoModel;


@Component({
  selector: 'app-production-management-production-list-detail',
  templateUrl: './production-list-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductionManagementProductionListDetailComponent implements OnInit {
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;
  dataInfo: ProductionListInfoModel;
  constructor(private dataService: ProductionListInfoService, private cdr: ChangeDetectorRef) {
    this.dataInfo = {
      id: null,
      placeNo: '',
      placeName: '',
      placeArea: null,
      productionDate: new Date(),
      longitude: null,
      latitude: null,
      locFactory: '',
    };
    this.returnBack = new EventEmitter<any>();
  }

  async getDetailInfo(){
    this.dataInfo = await this.dataService.getProductionInfoDetail(this.id);
    this.cdr.markForCheck();
  }


  returnBackToList() {
    this.returnBack.emit({refesh: false, pageNo: this.currentPageNum});
  }

  ngOnInit() {
    this.getDetailInfo()
  }

}
