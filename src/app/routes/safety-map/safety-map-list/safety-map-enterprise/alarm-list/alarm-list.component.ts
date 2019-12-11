import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { STColumn, STData } from '@delon/abc';
import { AlarmListService, AlarmListServiceNs } from '@core/biz-services/alarm-management/alarm-list.service';
import RealTimeAlarmModel = AlarmListServiceNs.RealTimeAlarmModel;
import { MapPipe } from '@shared/directives/pipe/map.pipe';

@Component({
  selector: 'alarm-list',
  templateUrl: './alarm-list.component.html',
  styleUrls: ['./alarm-list.component.scss'],
})
export class AlarmListComponent implements OnInit {
  columns: STColumn[];
  dataList: RealTimeAlarmModel[];
  @Input() entprId: number;

  constructor(private alarmListService: AlarmListService, private cdr: ChangeDetectorRef) {
    this.dataList = [];
  }

  private initTable(): void {
    this.columns = [
      { title: '设备编号', index: 'sensorNo', width: 180 },
      { title: '报警类型', index: 'alarmType', width: 180 ,  format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),},
      { title: '报警时间', index: 'alarmStartTime', width: 180, type: 'date' },
    ];
  }

  format(toBeFormat, arg) {
    return new MapPipe().transform(toBeFormat, arg);
  }

  async getAlarmList() {
    this.dataList = await this.alarmListService.getRealTimeAlarm(this.entprId);
    this.cdr.markForCheck();
  };

  ngOnInit() {
    this.initTable();
    this.getAlarmList();
  }

}
