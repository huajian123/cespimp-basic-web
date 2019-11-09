import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BasicInfoService, BasicInfoServiceNs } from '@core/biz-services/basic-info/basic-info.service';
import { NzMessageService } from 'ng-zorro-antd';
import FactoryInfoModel = BasicInfoServiceNs.FactoryInfoModel;

@Component({
  selector: 'app-basic-info-detail',
  templateUrl: './basic-info-detail.component.html',
  styleUrls: ['./basic-info-detail.component.scss']
})
export class BasicInfoDetailComponent implements OnInit {
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
