import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShowMessageService } from '../../../../../widget/show-message/show-message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParkIntroductManageService } from '@core/biz-services/park-introduct/park-introduct-manage.service';

import { UploadFile } from 'ng-zorro-antd';
import { environment, getwayKey } from '@env/environment';

enum PageTypeEnum {
  Announcement = 1, // 公告
  IndustryNews, // 行业动态发布
  FileNotifi, // 文件通知
  ParkIntroduction, // 园区介绍
  List,
  AddOrEdit,
  Detail,
}


@Component({
  selector: 'add-edit-park-introduct',
  templateUrl: './add-edit-park-introduct.component.html',
  styles: [],
})
export class AddEditParkIntroductComponent implements OnInit {
  currentTopBg: string;
  validateForm: FormGroup;
  form: FormGroup;
  @Output() returnBack: EventEmitter<any>;
  @Input() noticeType: number;
  pageTypeEnum = PageTypeEnum;
  uploadUrl: string;
  fileMineType: string;

  fileList: any[];
  parkImgList: any[];

  // 园区介绍中图片预览配置
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true,
  };
  previewVisible = false;
  previewImage: string | undefined = '';

  constructor(private fb: FormBuilder, private messageService: ShowMessageService, private dataService: ParkIntroductManageService) {
    this.currentTopBg = `url(../../../../assets/imgs/login-manage/manage-top.png) center no-repeat, #000949`;
    this.noticeType = PageTypeEnum.Announcement;
    this.fileMineType = '';
    this.uploadUrl = environment.baseUrl[getwayKey.Bs] + '/upload';
    this.returnBack = new EventEmitter<any>();
    this.fileList = [];
  }


  handleRemove(file: UploadFile): boolean {
    this.fileList = [];
    if (!!this.validateForm.get('fileUrl')) {
      this.validateForm.get('fileUrl').setValue(null);
      this.validateForm.get('fileName').setValue(null);
    } else {
      this.validateForm.get('pictureUrl').setValue(null);
    }

    this.validateForm.updateValueAndValidity();
    return true;
  }

  handlePreview(file: UploadFile) {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  uploadFn(e, type: 'file' | 'pic') {
    if (e.type === 'success') {
      if (e.file.response.code === 0) {
        if (type === 'file') {
          this.fileList = [{
            uid: e.file.uid,
            name: e.file.name,
            url: e.file.response.data,
          }];
          this.validateForm.get('fileUrl').setValue(e.file.response.data);
          this.validateForm.get('fileName').setValue(e.file.name);
        } else {
          this.validateForm.get('pictureUrl').setValue(e.file.response.data);
        }
      }
    }
  }


  initForm() {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      detail: [null, [Validators.required]],
      pictureUrl: [null, [Validators.required]],
      fileUrl: [null, [Validators.required]],
      fileName: [null],
    });
    if (this.noticeType === PageTypeEnum.Announcement || this.noticeType === PageTypeEnum.IndustryNews) {
      this.validateForm.controls['pictureUrl'].disable();
      this.validateForm.controls['fileUrl'].disable();
    } else if (this.noticeType === PageTypeEnum.FileNotifi) {
      this.validateForm.controls['detail'].disable();
      this.validateForm.controls['pictureUrl'].disable();
    } else {
      this.validateForm.controls['fileUrl'].disable();
    }
  }


  returnToList() {
    this.returnBack.emit();
  }

  ngOnInit() {
    this.initForm();
  }

}
