import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';
export namespace CameramanagementListServiceNs {
  export interface CameramanagementListInfoModel {
    id: number;
    cameraNo: string;
    cameraName: string;
    majorHazardId?: number;
    partType?: number;
    partId?: number;
    longitude: number; // 经度
    latitude: number; // 纬度
    locFactory?: string;
  }

  export class CameramanagementListInfoServiceClass {
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
    public getCameramanagementList(param: SearchCommonVO): Promise<PageInfo<CameramanagementListInfoModel>> {
      return this.http.get('data/major/hazard/cameras', param).toPromise();
    }
   /* /!*删除接口*!/
    public delWarehouseInfo(id: number): Promise<WarehouseListInfoModel> {
      return this.http.del('data/basic/enterprise/rooms/'+ id).toPromise();
    }*/
  }
}

@Injectable({
  providedIn: 'root',
})
export class CameramanagementListInfoService extends CameramanagementListServiceNs.CameramanagementListInfoServiceClass {
  constructor(http: HttpUtilService) {
    super(http);
  }

}
