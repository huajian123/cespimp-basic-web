import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginInfoModel } from '@core/vo/comm/BusinessEnum';
import {
  MajorHazardListInfoService,
  MajorHazardListServiceNs,
} from '@core/biz-services/major-hazard-management/major-hazard-list.service';
import { EVENT_KEY } from '@env/staticVariable';
import { MapPipe, MapSet } from '@shared/directives/pipe/map.pipe';
import { PositionPickerService } from '../../../../widget/position-picker/position-picker.service';
import { enterpriseInfo } from '@env/environment';
import { PositionPickerPolygonService } from '../../../../widget/position-picker-polygon/position-picker-polygon.service';
import EntprSearch = MajorHazardListServiceNs.EntprSearch;

interface OptionsInterface {
  value: string | number;
  label: string;
  partType?: number;
}

interface MajorHazardPartModel {
  partType: number;
  partNo: string;
  partName: string;
  partId: number;
}

@Component({
  selector: 'app-major-hazard-management-major-hazard-edit-add',
  templateUrl: './major-hazard-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MajorHazardManagementMajorHazardEditAddComponent implements OnInit {
  validateForm: FormGroup;
  form: FormGroup;
  @Input() id: number;
  @Input() entprId: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;
  unitTypeOptions: OptionsInterface[];
  HazardLevelOptions: OptionsInterface[];
  HazardNatureOptions: OptionsInterface[];
  loginInfo: LoginInfoModel;
  editIndex = -1;
  editObj = {};
  majorList: OptionsInterface[];
  majorAllNo: MajorHazardPartModel[];
  selMajorNoArray: OptionsInterface[];
  currentPolygonList: any[];

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              private dataService: MajorHazardListInfoService, private positionPickerService: PositionPickerService,
              private positionPickerPolygonService: PositionPickerPolygonService) {
    this.returnBack = new EventEmitter<any>();
    this.majorAllNo = [];
    this.selMajorNoArray = [];
    this.majorList = [
      { value: '1', label: '储罐' },
      { value: '2', label: '库房' },
      { value: '3', label: '生产场所' },
    ];
    this.unitTypeOptions = [];
    this.HazardLevelOptions = [];
    this.HazardNatureOptions = [];
    this.loginInfo = {
      createBy: '',
      createTime: new Date(),
      delFlag: null,
      entprId: null,
      id: null,
      mobileTel: '',
      password: '',
      realName: '',
      role: null,
      updateBy: '',
      updateTime: new Date(),
      userName: '',
    };
    this.currentPolygonList = [];
  }

  initForm() {
    this.validateForm = this.fb.group({
      majorHazardNo: [null, [Validators.required]],
      majorHazardName: [null, [Validators.required]],
      unitType: [null, [Validators.required]],
      majorHazardLevel: [null, [Validators.required]],
      majorHazardNature: [null, []],
      manager: [null, []],
      useDate: [null, []],
      rvalue: [null, []],
      managerMobile: [null, []],
      description: [null, []],
      majorScope: [null, [Validators.required]],
      locFactory: [null, []],
      majorHazardUnits: <FormArray>this.fb.array([]),
    });
  }

  async getDetail() {
    this.currentPolygonList.length = 0;
    const param: EntprSearch = {
      entprId: this.loginInfo.entprId,
    };
    const dataInfo = await this.dataService.getMajorHazardInfoDetail(this.id);
    if (dataInfo.majorScope) {
      dataInfo.majorScope.forEach(({ lng, lat }) => {
        this.currentPolygonList.push({ lng, lat });
      });
    }
    this.validateForm.patchValue(dataInfo);
    dataInfo.majorHazardUnits.forEach(item => {
      const field = this.createMedium();
      field.patchValue(item);
      this.mediumArray.push(field);
      //console.log(this.mediumArray.controls[0]);
    });
    //this.mediumArray.controls[0].partTypeLabel
    //this.mediumArray.controls[0].get('partTypeLabel').setValue('partNo');
    this.cdr.markForCheck();
  }

  // 重大危险源type类型选取改变
  changeMajorType(type, index) {
    // type为当前选中的重大危险源type
    const tempArray = this.majorAllNo.filter(item => {
      return '' + item.partType === type;
    });//
    this.selMajorNoArray = [];//先初始化一个类型下面的list菜单内容
    tempArray.forEach(item => {
      const obj = { value: item.partId, label: item.partNo, partType: item.partType };
      this.selMajorNoArray.push(obj);//循环插入当前类型下面的list下拉内容菜单需传递的参数（partId，partNo，partType）；
    });
    this.mediumArray.controls[index].get('partTypeLabel').reset();//重置formgroup中的选取显示内容
    this.mediumArray.controls[index].get('partNo').reset();//重置formgroup中的选取传递内容
  }

  changeMajorNo(partId, index) {
    if (partId) {
      const selObj = this.selMajorNoArray.find(item => {
        return item.value === partId;
      });
      this.mediumArray.controls[index].get('partTypeLabel').setValue(selObj.label);
      this.mediumArray.controls[index].get('partId').setValue(selObj.value);
    }
  }

  async getMajorList() {
    this.entprId = this.loginInfo.entprId;
    const data = await this.dataService.getMajorList(this.entprId);
    data.majorHazardPartDTOS.forEach(item => {
      this.majorAllNo.push({
        partType: item.partType,
        partNo: item.partNo,
        partName: item.partName,
        partId: item.partId,
      });
    });
  }

// 创建组成单元
  createMedium(): FormGroup {
    return this.fb.group({
      partType: [null, [Validators.required]],
      partNo: [null, [Validators.required]],
      entprId: [this.loginInfo.entprId],
      partId: [null, []],
      partTypeLabel: [null, []],
    });
  }

  //#region get form fields
  get mediumArray() {
    return this.validateForm.controls['majorHazardUnits'] as FormArray;
  }

  //#endregion
  // 新增组成单元
  add() {
    this.mediumArray.push(this.createMedium());
    this.edit(this.mediumArray.length - 1);
  }

  // 删除组成单元
  del(index: number) {
    this.mediumArray.removeAt(index);
  }

  // 编辑组成单元
  edit(index: number) {
    if (this.editIndex !== -1 && this.editObj) {
      this.mediumArray.at(this.editIndex).patchValue(this.editObj);
    }
    this.editObj = { ...this.mediumArray.at(index).value };
    this.editIndex = index;
  }

  // 保存单个组成单元
  save(index: number) {
    this.mediumArray.at(index).markAsDirty();
    if (this.mediumArray.at(index).invalid) return;
    this.editIndex = -1;
  }

  // 取消
  cancel(index: number) {
    if (!this.mediumArray.at(index).value.key) {
      this.del(index);
    } else {
      this.mediumArray.at(index).patchValue(this.editObj);
    }
    this.editIndex = -1;
  }

  returnToList() {
    this.returnBack.emit();
  }

  async submit() {
    Object.keys(this.validateForm.controls).forEach(key => {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    });
    if (this.validateForm.invalid) {
      return;
    }
    if ((this.validateForm.controls['majorHazardUnits'] as FormGroup).invalid) {
      return;
    }
    const params = this.validateForm.getRawValue();
    params.entprId = this.loginInfo.entprId;
    let submitHandel = null;
    if (!this.id) {
      params.createBy = this.loginInfo.userName;
      submitHandel = this.dataService.addMajorHazard(params);
    } else {
      params.id = this.id;
      params.updateBy = this.loginInfo.userName;
      submitHandel = this.dataService.editMajorHazard(params);
    }

    await submitHandel;
    this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });
  }

  showMap() {
    this.positionPickerService.show({
      isRemoteImage: true,
      longitude: enterpriseInfo.longitude,
      latitude: enterpriseInfo.latitude,
    }).then(res => {
      this.validateForm.get('longitude').setValue(res.longitude);
      this.validateForm.get('latitude').setValue(res.latitude);
    }).catch(e => null);
  }

  // 显示多边形地图
  showPolygonMap() {
    this.positionPickerPolygonService.show({
      isRemoteImage: true,
      longitude: enterpriseInfo.longitude,
      latitude: enterpriseInfo.latitude,
      currentPolygonList: this.currentPolygonList,
    }).then((res: ({ lat: number, lng: number }[])) => {
      const tempArray = [];
      if (res) {
        res.forEach(({ lat, lng }) => {
          const obj = { lat, lng };
          tempArray.push(obj);
        });
        this.currentPolygonList = [...tempArray];
        console.log(this.currentPolygonList);
        this.validateForm.get('majorScope').setValue(tempArray);
      }
    }).catch(e => null);
  }

  ngOnInit() {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.unitTypeOptions = [...MapPipe.transformMapToArray(MapSet.unitType)];
    this.HazardLevelOptions = [...MapPipe.transformMapToArray(MapSet.majorHazardLevel)];
    this.HazardNatureOptions = [...MapPipe.transformMapToArray(MapSet.majorHazardNature)];
    this.getMajorList();
    this.initForm();
    if (this.id) {
      this.getDetail();
    }
  }


}
