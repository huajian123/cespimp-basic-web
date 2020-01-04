import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';


export namespace SensorManagementListServiceNs {
  export interface SensorManagementListInfoModel {
    id: number;
    sensorType: string;
    sensorNo: string;
    sensorName: string;
    majorHazardId?: number;
    majorHazardName?: string;
    partType?: number;
    partId?: number;
    partName?: string;
    partNo?: string;
    longitude: number; // 经度
    latitude: number; // 纬度
    locFactory?: string;
    entprScope?: { lng: number, lat: number }[];
    firstAlarmThreshold: number;
    secondAlarmThreshold: number;
    thirdAlarmThreshold?: number;
    fourthAlarmThreshold?: number;
  }


  export interface MajorHazardUnitList {
    partType: number;
    partNames: MajorHazardType[];
  }

  export interface MajorHazardNameList {
    majorHazardId: number;
    majorHazardName: string;
  }

  export interface MajorHazardType {
    partId: number;
    partName: string;
    partNo: string;
  }

  export interface SensorSearchModel {
    entprName?: string;
    sensorNo?: string;
  }

  export class SensorManagementListInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

    /*新增接口*/
    public addSensor(param: SensorManagementListInfoModel): Promise<void> {
      return this.http.post('data/major/hazard/sensor', param, { needSuccessInfo: true }).toPromise();
    }

    /*修改接口*/
    public editSensor(param: SensorManagementListInfoModel): Promise<void> {
      return this.http.put('data/major/hazard/sensor', param, { needSuccessInfo: true }).toPromise();
    }

    /*传感器详情*/
    public getSensorInfoDetail(id: number): Promise<SensorManagementListInfoModel> {
      return this.http.get('data/major/hazard/sensor/' + id).toPromise();
    }

    /*传感器列表*/
    public getSensorManagementList(param: SearchCommonVO & SensorSearchModel): Promise<PageInfo<SensorManagementListInfoModel>> {
      return this.http.get('data/major/hazard/sensors', param).toPromise();
    }

    /*删除接口*/
    public delSensorInfo(id: number): Promise<SensorManagementListInfoModel> {
      return this.http.del('data/major/hazard/sensor/' + id).toPromise();
    }

    /*重大危险源名称*/
    public getMajorHazardNameList(entprId: number): Promise<MajorHazardNameList> {
      return this.http.get('data/major/hazard/MajorHazardName', { entprId: entprId }).toPromise();
    }

    /*重大危险源类型*/
    public getMajorHazardTypeList(majorHazardId: number): Promise<MajorHazardUnitList[]> {
      return this.http.get('data/major/hazard/MajorHazardType', { majorHazardId: majorHazardId }).toPromise();
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class SensorManagementListInfoService extends SensorManagementListServiceNs.SensorManagementListInfoServiceClass {
  constructor(http: HttpUtilService) {
    super(http);
  }

}
