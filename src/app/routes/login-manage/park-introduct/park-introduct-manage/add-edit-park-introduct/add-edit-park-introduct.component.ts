import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
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
  @Input() id: number;
  @Input() currentPageNum: number;
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

  public configuracoesEditor: object;
  public inicializado: boolean;

  editParam = {
    mobile: {
      theme: 'silver',
      plugins: ['autosave', 'lists', 'autolink'],
    },
    plugins: `link lists image code table colorpicker fullscreen fullpage help
    textcolor wordcount contextmenu codesample importcss media preview print
    textpattern tabfocus hr directionality imagetools autosave paste`,
    language_url: '../../../../../../assets/tinymce/langs/zh_CN.js',
    language: 'zh_CN',
    toolbar: 'codesample | bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft'
      + ' aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo '
      + '| link unlink image code | removeformat | h2 h4 | fullscreen preview paste',
    height: 700,
    width: 1200,
    codesample_languages: [
      { text: 'JavaScript', value: 'javascript' },
      { text: 'HTML/XML', value: 'markup' },
      { text: 'CSS', value: 'css' },
      { text: 'TypeScript', value: 'typescript' },
      { text: 'Java', value: 'java' },
    ],
    image_caption: true,
    // paset 插件允许粘贴图片
    paste_data_images: true,
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    // 这个便是自定义上传图片方法
    images_upload_handler: function(blobInfo, success, failure) {
      let xhr, formData;
      xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', '/api/upload');
      xhr.onload = function() {
        let json;
        if (xhr.status !== 200) {
          failure('HTTP Error: ' + xhr.status);
          return;
        }
        json = JSON.parse(xhr.responseText);
        if (!json || typeof json.location !== 'string') {
          failure('Invalid JSON: ' + xhr.responseText);
          return;
        }
        success(json.location);
      };
      formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());
      xhr.send(formData);
    },
  };


  constructor(private fb: FormBuilder, private messageService: ShowMessageService, private dataService: ParkIntroductManageService,private cdRef: ChangeDetectorRef) {
    this.currentTopBg = `url(../../../../assets/imgs/login-manage/manage-top.png) center no-repeat, #000949`;
    this.noticeType = PageTypeEnum.Announcement;
    this.fileMineType = '';
    this.uploadUrl = environment.baseUrl[getwayKey.Bs] + 'upload?_allow_anonymous=true';
    console.log(this.uploadUrl);
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
    console.log(this.noticeType);
    console.log(this.noticeType === PageTypeEnum.Announcement || this.noticeType === PageTypeEnum.IndustryNews);
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

  async submitForm() {
    Object.keys(this.validateForm.controls).forEach(key => {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    });
    console.log(this.validateForm.invalid);
    console.log(this.validateForm);
    if (this.validateForm.invalid) {
      return;
    }
    const params = this.validateForm.getRawValue();
    params.noticeType = this.noticeType;
    let submitHandel = null;
    if (!this.id) {
      submitHandel = this.dataService.addNotice(params);
    } else {
      params.id = this.id;
      submitHandel = this.dataService.editNotice(params);
    }

    await submitHandel;

    this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });
  }

  returnToList() {
    this.returnBack.emit();
  }

  async getDetail() {
    const dataInfo = await this.dataService.getNoticeInfo(this.id);
    this.fileList = [{
      name: dataInfo.fileName,
      status: 'done',
      url: dataInfo.fileUrl || dataInfo.pictureUrl
    }];
    this.validateForm.patchValue(dataInfo);
  }

  ngOnInit() {
    console.log(1234);
    this.initForm();
    if (this.id) {
      this.getDetail();
    }
  }
}
