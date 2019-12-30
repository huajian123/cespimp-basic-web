import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';


export namespace CameraManagementListServiceNs {
  export interface CameraManagementListInfoModel {
    id: number;
    cameraNo: string;
    cameraName: string;
    majorHazardId?: number;
    majorHazardName?:string;
    partType?: number;
    partId?: number;
    partName?:string;
    longitude: number; // 经度
    latitude: number; // 纬度
    locFactory?: string;
  }

  export interface CameraSearchModel {
    entprName?: string;
    cameraNo?: string;
  }

  export interface majorHazardData {
    majorHazardPartDTOS: MajorHazardUnitList[],
    majorHazardInfoNeedListDTOS: MajorHazardInfoNeedList[];
  }

  export interface MajorHazardUnitList {
    id?: number;
    entprId?: number;
    partType: number;
    partId: number;
    partNo: string;
    partName?: string;
  }

  export interface MajorHazardInfoNeedList {
    majorHazardId: number;
    majorHazardName: string;
  }

  export class CameraManagementListInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

    /*新增接口*/
    public addCamera(param: CameraManagementListInfoModel): Promise<void> {
      return this.http.post('data/major/hazard/camera', param, { needSuccessInfo: true }).toPromise();
    }

    /*修改接口*/
    public editCamera(param: CameraManagementListInfoModel): Promise<void> {
      return this.http.put('data/major/hazard/camera', param, { needSuccessInfo: true }).toPromise();
    }

    /*摄像头详情*/
    public getCameraInfoDetail(id: number): Promise<CameraManagementListInfoModel> {
      return this.http.get('data/major/hazard/camera/' + id).toPromise();
    }

    /*摄像头列表*/
    public getCameraManagementList(param: SearchCommonVO & CameraSearchModel): Promise<PageInfo<CameraManagementListInfoModel>> {
      return this.http.get('data/major/hazard/cameras', param).toPromise();
    }

    /*删除接口*/
    public delCameraInfo(id: number): Promise<CameraManagementListInfoModel> {
      return this.http.del('data/major/hazard/camera/' + id).toPromise();
    }

    /*重大危险源组成信息下拉列表*/
    public getMajorList(entprId: number): Promise<majorHazardData> {
      return this.http.get('data/major/hazard/need', { entprId: entprId }).toPromise();
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class CameraManagementListInfoService extends CameraManagementListServiceNs.CameraManagementListInfoServiceClass {
  constructor(http: HttpUtilService) {
    super(http);
  }

}
