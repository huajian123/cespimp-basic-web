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
import { STColumn } from '@delon/abc';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { PositionPickerService } from '../../../widget/position-picker/position-picker.service';


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
  columns: STColumn[];

  constructor(private http: _HttpClient, private msg: NzMessageService,
              private dataService: ProductionListInfoService, private cdr: ChangeDetectorRef,
              private positionPickerService: PositionPickerService) {
    this.returnBack = new EventEmitter<any>();

    this.dataInfo = {
      id: -1,
      placeNo: '',
      placeName: '',
      placeArea: -1,
      longitude: -1,
      latitude: -1,
      productionDate: new Date(),
      locFactory: '',
      majorHazardMaterials: [],
      majorHazardMaterialInsertDTOS: [],
    };

    this.columns = [
      { title: '品名', index: 'productName', width: 60 },
      { title: 'CAS号', index: 'casNo', width: 60 },
      { title: '临界量（吨）', index: 'criticalMass', width: 60 },
      {
        title: '设计贮存最大量（吨）',
        index: 'maximumReserves',
        width: 60,
      },
    ];
  }

  returnToList() {
    this.returnBack.emit({ refesh: false, pageNo: this.currentPageNum });
  }

  showMap() {
    this.positionPickerService.show({
      isRemoteImage: true,
      longitude: this.dataInfo.longitude,
      latitude: this.dataInfo.latitude,
    }).then().catch(e => e);
  }

  async getDetailInfo() {
    this.dataInfo = await this.dataService.getProductionInfoDetail(this.id);
    console.log(this.dataInfo);
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.getDetailInfo();
  }
}
