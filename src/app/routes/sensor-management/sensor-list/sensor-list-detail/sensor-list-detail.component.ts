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
  SensorManagementListInfoService,
  SensorManagementListServiceNs,
} from '@core/biz-services/sensor-management/sensor-management.service';
import SensorManagementListInfoModel = SensorManagementListServiceNs.SensorManagementListInfoModel;


@Component({
  selector: 'app-sensor-management-sensor-list-detail',
  templateUrl: './sensor-list-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorManagementSensorListDetailComponent implements OnInit {
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;
  sensorTrue: boolean;
  dataInfo: SensorManagementListInfoModel;

  constructor(private dataService: SensorManagementListInfoService, private cdr: ChangeDetectorRef) {
    this.returnBack = new EventEmitter<any>();
    this.sensorTrue = true;
    this.dataInfo = {
      id: null,
      sensorType: '',
      sensorNo: '',
      sensorName: '',
      majorHazardId: null,
      partType: null,
      partId: null,
      longitude: null,
      latitude: null,
      locFactory: '',
      firstAlarmThreshold: null,
      secondAlarmThreshold: null,
      thirdAlarmThreshold: null,
      fourthAlarmThreshold: null,
    };
  }

  returnToList() {
    this.returnBack.emit({ refesh: false, pageNo: this.currentPageNum });
  }

  async getDetailInfo() {
    this.dataInfo = await this.dataService.getSensorInfoDetail(this.id);
    //console.log(this.dataInfo);
    if (this.dataInfo.sensorType == '' + 3) {
      this.sensorTrue = false;
    }
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.getDetailInfo();
  }


}
