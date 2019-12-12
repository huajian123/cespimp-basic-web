import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';


export namespace SafetyMapServiceNs {
  export enum WebSocketTypeEnum {
    Alarm = 1,
    Temp,
  }

  export interface VideoCameraModel {
    id?: number;
    entprId?: number;
    url?: string;
    cameraName?: string;
  }

  export interface IdentificationSearchModel {
    entprId: number;
    types: number[]
  }

  export interface IdentificationDataModel {
    temp?: IdentificationNormalInterface[];
    liquid?: IdentificationNormalInterface[];
    alarm?: AlarmModel[];
    majorHazardInfo?: MajorHazardModel[];
    pressure?: IdentificationNormalInterface[];
    poisonous?: IdentificationNormalInterface[];
    camera?: CameraModel[];
    combustible?: IdentificationNormalInterface[];
  }

  export interface CameraModel {
    'id': number,
    'entprId': number,
    'cameraNo': string,
    'cameraName': string,
    'majorHazardId': number,
    'partType': number,
    'partId': number,
    'longitude': number,
    'latitude': number,
    'locFactory': string,
    'entprName': string,
    'majorHazardName': string,
    'partName': string,
  }

  export interface LatitudeLongitudeModel {
    lng: number,
    lat: number,
  }

  export interface MajorHazardModel {
    'id': number,
    'entprId': number,
    'entprName': string,
    'majorHazardNo': string,
    'majorHazardName': string,
    'unitType': number,
    'useDate': number,
    'locFactory': string,
    'majorHazardLevel': number,
    'majorHazardNature': number,
    'manager': string,
    'managerMobile': string,
    'description': string,
    majorScope: LatitudeLongitudeModel[];
  }


  export interface AlarmModel {
    'id': number,
    'total': number,
    'deviceNo': string,
    'alarmType': number,
    'alarmTime': number,
    'longitude': number,
    'latitude': number,
  }

  export interface IdentificationNormalInterface {
    'id': number,
    'sensorName': string,
    'sensorNo': string,
    'locFactory': string,
    'currentValue': number,
    'status': number,
    'firstAlarmThreshold': number,
    'secondAlarmThreshold': number,
    'longitude': number,
    'latitude': number,
    'thirdAlarmThreshold'?: number,
    'fourthAlarmThreshold'?: number,
    historyData: HistoryDataModel[]
  }

  export interface HistoryDataModel {
    'id': number,
    'entprId': number,
    'sensorId': number,
    'sensorNo': string,
    'sensorValue': number,
    'sensorType': number,
    'reportTime': number,
  }

  export interface SensorInfoWebSocketModel {
    sensorName: string;
    sensorNo: string;
    locFactory: string;
    firstAlarmThreshold: number;
    secondAlarmThreshold: number;
    status: number;
    currentValue: number;
    historyData: { reportTime: number, sensorValue: number }[];
  }

  export class SafetyMapServiceClass {
    constructor(private http: HttpUtilService) {
    }


    // 获取证照信息详情
    public getIdCardInfoDetail(param: IdentificationSearchModel): Promise<IdentificationDataModel> {
      return this.http.post('data/major/hazard/maps', param).toPromise();
    }

    public getCameraInfoDetail(id: number): Promise<VideoCameraModel> {
      return this.http.get('data/major/hazard/realTimeCamera/' + id).toPromise();
    }

    public openWebsocket(): Promise<any> {
      return this.http.get('data/major/hazard/realTimeSensor').toPromise();
    }

  }
}

@Injectable({
  providedIn: 'root',
})
export class SafetyMapService extends SafetyMapServiceNs.SafetyMapServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }

}
