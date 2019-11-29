import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';
export namespace SensorManagementListServiceNs {
  export interface SensorManagementListInfoModel {
    id: number;
    sensorType: string;
    majorHazardId?: number;
    partType?: number;
    partId?: number;
    longitude: number; // 经度
    latitude: number; // 纬度
    locFactory?: string;
    firstAlarmThreshold: number;
    secondAlarmThreshold: number;
    thirdAlarmThreshold: number;
    fourthAlarmThreshold: number;
  }

  export class SensorManagementListInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }
    /*   /!*新增接口*!/
       public addWarehouse(param:WarehouseListInfoModel): Promise<void> {
         return this.http.post('data/basic/enterprise/rooms',param,{needSuccessInfo: true}).toPromise();
       }
       /!*修改接口*!/
       public editWarehouse(param: WarehouseListInfoModel): Promise<void> {
         return this.http.put('data/basic/enterprise/rooms',param,{needSuccessInfo: true}).toPromise();
       }
       /!*库房详情*!/
       public getWarehouseInfoDetail(id: number): Promise<WarehouseListInfoModel> {
         return this.http.get('data/basic/enterprise/rooms/'+ id).toPromise();
       }*/
    /*库房列表*/
    public getSensorManagementList(param: SearchCommonVO): Promise<PageInfo<SensorManagementListInfoModel>> {
      return this.http.get('data/major/hazard/sensors', param).toPromise();
    }
     /*删除接口*/
     public delSensorInfo(id: number): Promise<SensorManagementListInfoModel> {
       return this.http.del('data/major/hazard/sensor/'+ id).toPromise();
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
