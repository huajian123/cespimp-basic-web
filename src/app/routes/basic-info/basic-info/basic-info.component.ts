import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { STColumn } from '@delon/abc';
import { NzMessageService } from 'ng-zorro-antd';
import { BasicInfoService, BasicInfoServiceNs } from '@core/biz-services/basic-info/basic-info.service';
import FactoryInfoModel = BasicInfoServiceNs.FactoryInfoModel;

@Component({
  selector: 'app-basic-info-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

/*export interface FactoryInfoModel {
  id: number;
  enterpriseName: string;
  area: string;
  businessLicense: string;
  nature: string;
  industry: string;
  address: string;
  contacts: string;
  telephone: string;
  legalPerson: string;
  scale: string;
  planeLayout: string;
  environment: string;
  longitude: number; // 经度
  latitude: number; // 纬度
  zoom?: number; // 放大倍数
}*/


export class BasicInfoBasicInfoComponent implements OnInit {
  dataInfo: FactoryInfoModel;

  constructor(private dataService: BasicInfoService, private msg: NzMessageService, private cdr: ChangeDetectorRef) {
    this.dataInfo = {
      id: -1,
      enterpriseName: '',
      area: '',
      businessLicense: '',
      nature: '',
      industry: '',
      address: '',
      contacts: '',
      telephone: '',
      legalPerson: '',
      scale: '',
      planeLayout: '',
      environment: '',
      longitude: -1,
      latitude: -1,
    };
  }

  async getFactoryInfo() {
    this.dataInfo = await this.dataService.getFactoryInfoModel();
    this.cdr.markForCheck();
    console.log(this.dataInfo);
  }

  ngOnInit(): void {
    this.getFactoryInfo();
  }
}
