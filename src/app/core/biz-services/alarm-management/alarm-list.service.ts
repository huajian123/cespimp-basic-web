import { Injectable } from '@angular/core';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { HttpUtilService } from '@core/net/http-util.service';
import { PageInfo } from '@core/vo/comm/PageInfo';
import { BasicInfoServiceNs } from '@core/biz-services/basic-info/basic-info.service';


export namespace AlarmListServiceNs {
  export interface AlarmModel {
    id: number;
    entprId: number;
    entprName: string;
    alarmType: number;
    alarmContent: string;
    alarmStartTime: Date;
    alarmStatus: number;
    alarmEndTime: Date;
    handleName: string;
    handleTime: Date;
    handleResult: string;
  }


  export class AlarmListServiceClass {
    constructor(private http: HttpUtilService) {
    }

    public getAlarmList(param: SearchCommonVO): Promise<PageInfo<AlarmModel>> {
      return this.http.get('data/major/hazard/alarms', param).toPromise();
    }
  }
}


@Injectable({
  providedIn: 'root',
})
export class AlarmListService extends AlarmListServiceNs.AlarmListServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }
}
