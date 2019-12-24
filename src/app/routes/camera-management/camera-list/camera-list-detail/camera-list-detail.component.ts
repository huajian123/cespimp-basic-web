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
  CameraManagementListInfoService,
  CameraManagementListServiceNs,
} from '@core/biz-services/camera-management/camera-list.service';
import CameraManagementListInfoModel = CameraManagementListServiceNs.CameraManagementListInfoModel;

@Component({
  selector: 'app-camera-management-camera-list-detail',
  templateUrl: './camera-list-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CameraManagementCameraListDetailComponent implements OnInit {
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;
  dataInfo: CameraManagementListInfoModel;

  constructor(private dataService: CameraManagementListInfoService, private cdr: ChangeDetectorRef) {
    this.returnBack = new EventEmitter<any>();
    this.dataInfo = {
      id: null,
      cameraNo: '',
      cameraName: '',
      majorHazardId: null,
      partType: null,
      partId: null,
      longitude: null,
      latitude: null,
      locFactory: '',
    };
  }

  returnToList() {
    this.returnBack.emit({ refesh: false, pageNo: this.currentPageNum });
  }

  async getDetailInfo() {
    this.dataInfo = await this.dataService.getCameraInfoDetail(this.id);
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.getDetailInfo();
  }

}
