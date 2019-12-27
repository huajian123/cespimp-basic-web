import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { STColumn, STData } from '@delon/abc';
import { AlarmListService, AlarmListServiceNs } from '@core/biz-services/alarm-management/alarm-list.service';
import RealTimeAlarmModel = AlarmListServiceNs.RealTimeAlarmModel;
import { MapPipe } from '@shared/directives/pipe/map.pipe';
import { webSocketIp } from '@env/environment';
import { SafetyMapServiceNs } from '@core/biz-services/safety-map/safety-map.service';
import WebSocketTypeEnum = SafetyMapServiceNs.WebSocketTypeEnum;


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
    this.dataList = await this.alarmListService.getRealTimeAlarm();
    this.cdr.markForCheck();
  };

  connectWs() {
    if (this.ws != null) {
      this.ws.close();
    }
    this.ws = new WebSocket(`ws://${webSocketIp}:8081/websocket/${WebSocketTypeEnum.Alarm}`);
    this.ws.onopen = (e) => {
      //socket 开启后执行，可以向后端传递信息
      // this.ws.send('sonmething');

    };
    this.ws.onmessage = (e) => {
      //socket 获取后端传递到前端的信息
      // this.ws.send('sonmething');
      if (e.data !== '-连接已建立-') {
        console.log(e);
        const tempArray = JSON.parse(e.data);
        if (tempArray.length === 0) {
          return;
        }
        this.dataList = (tempArray as any[]).filter((item) => {
          return item.entprId === this.entprId;
        });
        console.log(tempArray);
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
