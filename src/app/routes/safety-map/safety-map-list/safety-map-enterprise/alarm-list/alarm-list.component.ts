import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { STColumn, STData } from '@delon/abc';
import { AlarmListService, AlarmListServiceNs } from '@core/biz-services/alarm-management/alarm-list.service';
import RealTimeAlarmModel = AlarmListServiceNs.RealTimeAlarmModel;
import { MapPipe } from '@shared/directives/pipe/map.pipe';


@Component({
  selector: 'alarm-list',
  templateUrl: './alarm-list.component.html',
  styleUrls: ['./alarm-list.component.scss'],
})
export class AlarmListComponent implements OnInit,OnDestroy {
  columns: STColumn[];
  dataList: RealTimeAlarmModel[];
  @Input() entprId: number;
  ws: WebSocket;//定义websocket

  constructor(private alarmListService: AlarmListService, private cdr: ChangeDetectorRef) {
    this.dataList = [];
  }

  private initTable(): void {
    this.columns = [
      { title: '设备编号', index: 'sensorNo', width: 180 },
      {
        title: '报警类型',
        index: 'alarmType',
        width: 180,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
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

  connectWs() {
    if (this.ws != null) {
      this.ws.close();
    }
    this.ws = new WebSocket('ws://172.16.1.18:8081/websocket');
    this.ws.onopen = (e) => {
      //socket 开启后执行，可以向后端传递信息
      // this.ws.send('sonmething');

    };
    this.ws.onmessage = (e) => {
      //socket 获取后端传递到前端的信息
      // this.ws.send('sonmething');
      if (e.data !== '连接成功') {
        const tempArray = JSON.parse(e.data);
        this.dataList = (tempArray as any[]).filter((item) => {
          return item.entprId === this.entprId;
        });
        this.cdr.markForCheck();
      }
    };
    this.ws.onerror = (e) => {
      //socket error信息
      console.log(e);

    };
    this.ws.onclose = (e) => {
      //socket 关闭后执行
      console.log(e);
    };
  }

  ngOnInit() {
    this.initTable();
    this.getAlarmList();
    this.connectWs();
  }

  ngOnDestroy(): void {
    this.ws.close();
  }

}
