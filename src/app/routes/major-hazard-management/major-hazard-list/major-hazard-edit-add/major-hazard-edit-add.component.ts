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
import MajorHazardUnitList = MajorHazardListServiceNs.MajorHazardUnitList;


interface OptionsInterface {
  value: string | number;
  label: string;
  partNo?: string;
}


interface MajorHazardPartModel {
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
  dataMajorInfo: MajorHazardUnitList[];
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

  async getPartNoOptions(type, index) {
   /* if (this.id !== null) {//id不为空表示此时是编辑不是新增重新调用接口插值
      this.changeMajorType(type, index);
    }*/
    this.selMajorNoArray = [];//初始化组成类型下拉的菜单内容
    if (this.dataMajorInfo) {
      this.dataMajorInfo.forEach(item => {
        const MajorInfoObject = { value: item.partId, label: item.partName, partNo: item.partNo };
        this.selMajorNoArray.push(MajorInfoObject);//循环插入当前类型下面的list下拉内容菜单需传递的参数（partId，partNo，partName）；
      });
    }
  };

  async getDetail() {
    this.currentPolygonList.length = 0;
    const dataInfo = await this.dataService.getMajorHazardInfoDetail(this.id);
    if (dataInfo.majorScope) {
      dataInfo.majorScope.forEach(({ lng, lat }) => {
        this.currentPolygonList.push({ lng, lat });
      });
    }
    this.validateForm.patchValue(dataInfo);
    dataInfo.majorHazardUnits.forEach((item, index) => {
      const field = this.createMedium();
      this.getPartNoOptions((item as any).partType, index);
      field.patchValue(item);
      field.get('partName').setValue((item as any).partName);
      this.mediumArray.push(field);
    });
    this.cdr.markForCheck();
  }

  // 重大危险源选取改变type类型
  async changeMajorType(type, index) {
    const majorParam = {
      entprId: this.loginInfo.entprId,
      partType: type,
    };
    this.dataMajorInfo = await this.dataService.getMajorList(majorParam);
    this.getPartNoOptions(type, index);
    this.mediumArray.controls[index].get('partId').reset();
    this.mediumArray.controls[index].get('partNo').reset();
    this.cdr.markForCheck();
  }

  changeMajorNo(partId, index) {
    if (partId) {
      const selectObject = this.selMajorNoArray.find(item => {
        return item.value === partId;
      });
      this.mediumArray.controls[index].get('partName').setValue(selectObject.label);
      this.mediumArray.controls[index].get('partNo').setValue(selectObject.partNo);
    }
  }


// 创建组成单元
  createMedium(): FormGroup {
    return this.fb.group({
      partType: [null, [Validators.required]],
      partNo: [null, [Validators.required]],
      entprId: [this.loginInfo.entprId],
      partId: [null, []],
      partName: [null, []],
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
    this.editIndex = index;
    this.editObj = { ...this.mediumArray.at(index).value };
    /*console.log(this.mediumArray);*/
    this.mediumArray.at(index).get('partType').setValue((this.editObj as any).partType);
    this.mediumArray.at(index).get('partId').setValue((this.editObj as any).partId);
    this.mediumArray.at(index).get('partNo').setValue((this.editObj as any).partNo);
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
        this.validateForm.get('majorScope').setValue(tempArray);
      }
    }).catch(e => null);
  }

  ngOnInit() {
    this.loginInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo));
    this.unitTypeOptions = [...MapPipe.transformMapToArray(MapSet.unitType)];
    this.HazardLevelOptions = [...MapPipe.transformMapToArray(MapSet.majorHazardLevel)];
    this.HazardNatureOptions = [...MapPipe.transformMapToArray(MapSet.majorHazardNature)];
    this.initForm();
    if (this.id) {
      this.getDetail();
    }
  }
}
