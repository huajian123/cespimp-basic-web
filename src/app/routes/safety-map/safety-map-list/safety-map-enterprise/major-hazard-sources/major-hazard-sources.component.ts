import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output, ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageTypeEnum } from '@core/vo/comm/BusinessEnum';
import { STColumn, STComponent, STData } from '@delon/abc';
import { MapPipe } from '@shared/directives/pipe/map.pipe';
import {
  SafetyMapService,
  SafetyMapServiceNs,
} from '@core/biz-services/safety-map/safety-map.service';
import MajorHazardModel = SafetyMapServiceNs.MajorHazardModel;
import UintsModel = SafetyMapServiceNs.UintsModel;
import HazardMaterialsModel = SafetyMapServiceNs.HazardMaterialsModel;
import CameraModel = SafetyMapServiceNs.CameraModel;
import SensorInfoWebSocketModel = SafetyMapServiceNs.SensorInfoWebSocketModel;


enum TabChangeEnum {
  Unit = 1,
  Danger,
  Sensor,
  Camera
}

@Component({
  selector: 'major-hazard-sources',
  templateUrl: './major-hazard-sources.component.html',
  styleUrls: ['./major-hazard-sources.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MajorHazardSourcesComponent implements OnInit {
  validateForm: FormGroup;
  @Input() id: number;
  currentPage: number;
  pageTypeEnum = PageTypeEnum;
  itemId: number;
  uintsColumns: STColumn[];
  hazardColumns: STColumn[];
  sensorColumns: STColumn[];
  cameraColumns: STColumn[];
  @Input() showModel: boolean;
  @Output() showModelChange = new EventEmitter<boolean>();
  dataUintsList: UintsModel[];
  dataHazardList: HazardMaterialsModel[];
  dataCameraList: CameraModel[];
  dataSensorList: SensorInfoWebSocketModel[];
  dataInfo: MajorHazardModel;
  @ViewChild('uintsSt', { static: false }) uintsSt: STComponent;
  @ViewChild('hazardSt', { static: false }) hazardSt: STComponent;
  @ViewChild('sensorSt', { static: false }) sensorSt: STComponent;
  @ViewChild('cameraSt', { static: false }) cameraSt: STComponent;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private dataService: SafetyMapService) {
    this.dataUintsList = [];
    this.dataHazardList = [];
    this.dataCameraList = [];
    this.dataSensorList = [];
    this.initColumns();
    this.dataInfo = {
      id: null,
      entprId: null,
      entprName: '',
      majorHazardNo: '',
      majorHazardName: '',
      rvalue: -1,
      unitType: -1,
      useDate: new Date(),
      locFactory: '',
      majorHazardLevel: -1,
      majorHazardNature: -1,
      manager: '',
      managerMobile: '',
      description: '',
    };
  }

  initForm() {
    this.validateForm = this.fb.group({
      entprName: [null, []],
      majorHazardName: [null, []],
      majorHazardNo: [null, []],
      unitType: [null, []],
      useDate: [null, []],
      rvalue: [null, []],
      majorHazardLevel: [null, []],
      majorHazardNature: [null, []],
      manager: [null, []],
      managerMobile: [null, []],
      locFactory: [null, []],
      description: [null, []],
    });
  }

  goDetailPage(item, modal) {
    this.itemId = item.id;
    this.currentPage = this.pageTypeEnum.DetailOrExamine;
  }

  format(toBeFormat, arg) {
    return new MapPipe().transform(toBeFormat, arg);
  }

  initColumns() {
    this.uintsColumns = [
      {
        title: '单元类别',
        index: 'partType',
        width: 120,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
      { title: '单元名称', index: 'partName', width: 100 },
      { title: '单元编号', index: 'partNo', width: 120 },
      { title: '投用时间', index: 'productionDate', width: 100, type: 'date' },
      { title: '在厂区的位置', index: 'locFactory', width: 100 },
      {
        title: '操作',
        fixed: 'right',
        width: '60px',
        buttons: [
          {
            text: '查看',
            icon: 'eye',
            click: this.goDetailPage.bind(this),
          },
        ],
      },
    ];
    this.hazardColumns = [
      { title: '品名', index: 'productName', width: 120 },
      { title: 'CAS号', index: 'casNo', width: 100 },
      { title: '临界量（吨）', index: 'criticalMass', width: 120 },
      { title: '设计储存最大量（吨）', index: 'maximumReserves', width: 100 },
    ];
    this.sensorColumns = [
      { title: '传感器名称', index: 'sensorName', width: 120 },
      { title: '传感器编号', index: 'sensorNo', width: 100 },
      {
        title: '传感器类型',
        index: 'sensorType',
        width: 120 ,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
      { title: '在厂区位置', index: 'locFactory', width: 100, },
      {
        title: '操作',
        fixed: 'right',
        width: '60px',
        buttons: [
          {
            text: '查看',
            icon: 'eye',
            click: this.goDetailPage.bind(this),
          },
        ],
      },
    ];
    this.cameraColumns = [
      { title: '摄像头名称', index: 'cameraName', width: 120 },
      { title: '摄像头编号', index: 'cameraNo', width: 100 },
      { title: '在厂区位置', index: 'locFactory', width: 120 },
      {
        title: '操作',
        fixed: 'right',
        width: '60px',
        buttons: [
          {
            text: '查看',
            icon: 'eye',
            click: this.goDetailPage.bind(this),
          },
        ],
      },
    ];
  }

  selectChanged(e): void {
    switch (e.index) {
      case TabChangeEnum.Unit: {
        this.dataUintsList = [];
        this.dataInfo.majorHazardUnits.forEach(item => {
          const UintsObject = {
            partType: item.partType,
            partName: item.partName,
            partNo: item.partNo,
            productionDate: item.productionDate,
            locFactory: item.locFactory,
          };
          this.dataUintsList.push(UintsObject);
        });
        this.uintsSt.reload();
        break;
      }
      case TabChangeEnum.Danger: {
        this.dataHazardList = [];
        this.dataInfo.majorHazardMaterials.forEach(item => {
          const hazardObject = {
            productName: item.productName,
            casNo: item.casNo,
            criticalMass: item.criticalMass,
            maximumReserves: item.maximumReserves,
          };
          this.dataHazardList.push(hazardObject);
        });
        this.hazardSt.reload();
        break;
      }
      case TabChangeEnum.Sensor: {
        this.dataSensorList = [];
        this.dataInfo.majorHazardSenSores.forEach(item => {
          const sensorObject = {
            sensorName: item.sensorName,
            sensorNo: item.sensorNo,
            sensorType: item.sensorType,
            locFactory: item.locFactory,
          };
          this.dataSensorList.push(sensorObject);
        });
        this.sensorSt.reload();
        break;
      }
      case TabChangeEnum.Camera: {
        this.dataCameraList = [];
        this.dataInfo.majorHazardCameras.forEach(item => {
          const cameraObject = {
            cameraName: item.cameraName,
            cameraNo: item.cameraNo,
            locFactory: item.locFactory,
          };
          this.dataCameraList.push(cameraObject);
        });
        this.cameraSt.reload();
        break;
      }
    }
  }


  close() {
    this.showModel = false;
    this.showModelChange.emit(false);
  }

  async getDetailInfo(id?) {
    this.dataInfo = await this.dataService.getHazardSourceDetail(id ? id : this.id);
    this.dataInfo.unitType = new MapPipe().transform(this.dataInfo.unitType, 'unitType');
    this.dataInfo.majorHazardLevel = new MapPipe().transform(this.dataInfo.majorHazardLevel, 'majorHazardLevel');
    this.dataInfo.majorHazardNature = new MapPipe().transform(this.dataInfo.majorHazardNature, 'majorHazardNature');
    this.validateForm.patchValue(this.dataInfo);
    this.cdr.markForCheck();
  }

  ngOnInit() {
    this.initForm();
    this.getDetailInfo();
  }

}
