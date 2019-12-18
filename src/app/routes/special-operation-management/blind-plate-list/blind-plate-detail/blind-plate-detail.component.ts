import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpecialOperationInfoService } from '@core/biz-services/special-operation-management/special-operation-management.service';
import { environment, getwayKey } from '@env/environment';
import { MapPipe } from '@shared/directives/pipe/map.pipe';
import { UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-special-operation-management-blind-plate-detail',
  templateUrl: './blind-plate-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialOperationManagementBlindPlateDetailComponent implements OnInit {
  validateForm: FormGroup;
  uploadUrl: string;
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true,
  };
  previewImage: string | undefined = '';
  previewVisible = false;
  certificateFileList: any[];

  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder, private dataService: SpecialOperationInfoService) {
    this.returnBack = new EventEmitter<any>();
    this.certificateFileList = [];
    this.previewVisible = false;
    this.previewImage = '';
    this.uploadUrl = environment.baseUrl[getwayKey.Bs] + 'upload?_allow_anonymous=true';
  }

  initForm() {
    this.validateForm = this.fb.group({
      operationName: [null, []],
      operationPlace: [null, []],
      operationContent: [null, []],
      applicationName: [null, []],
      applicationTime: [null, []],
      processName: [null, []],
      guardianName: [null, []],
      leadingName: [null, []],
      operationStartTime: [null, []],
      operationEndTime: [null, []],
      operationCertificate: [null, []],
      reviewName: [null, []],
      reviewTime: [null, []],
      reviewExplain: [null, []],
      reviewStatus: [null, []],
    });
  }

  async getDetailInfo() {
    const dataInfo = await this.dataService.getSpecialOperationInfoDetail(this.id);
    dataInfo.applicationTime = new MapPipe().transform(dataInfo.applicationTime, 'date:yyyy-MM-dd hh:m');
    dataInfo.operationStartTime = new MapPipe().transform(dataInfo.operationStartTime, 'date:yyyy-MM-dd hh:m');
    dataInfo.operationEndTime = new MapPipe().transform(dataInfo.operationEndTime, 'date:yyyy-MM-dd hh:m');
    dataInfo.reviewTime = new MapPipe().transform(dataInfo.reviewTime, 'date:yyyy-MM-dd hh:m');
    dataInfo.reviewStatus = new MapPipe().transform(dataInfo.reviewStatus, 'reviewStatus');
    this.certificateFileList = [
      {
        name: '作业附件',
        status: 'done',
        url: dataInfo.operationCertificate,
      },
    ];
    this.validateForm.patchValue(dataInfo);
    this.cdr.markForCheck();
  }

  uploadFn(e, formControlName: string) {
    if (e.type === 'success') {
      if (e.file.response.code === 0) {
        this.validateForm.get(formControlName).setValue(e.file.response.data);
      }
    }
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  returnBackToList() {
    this.returnBack.emit({ refesh: false, pageNo: this.currentPageNum });
  }

  ngOnInit(): void {
    this.initForm();
    this.getDetailInfo();
  }


}
