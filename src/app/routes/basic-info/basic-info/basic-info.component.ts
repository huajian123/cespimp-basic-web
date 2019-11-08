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

export class BasicInfoBasicInfoComponent implements OnInit {
  dataInfo: FactoryInfoModel;
  showImgUrl: string;
  isShowPreviewModal: boolean;

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
    this.showImgUrl = '';
    this.isShowPreviewModal = false;
  }


  public showPreviewModal(imgType) {
    this.showImgUrl = this.dataInfo[imgType];
    this.isShowPreviewModal = true;
  }

  async getFactoryInfo() {
    this.dataInfo = await this.dataService.getFactoryInfoModel();
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.getFactoryInfo();
  }
}
