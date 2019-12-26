import { Injectable, Injector } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { PageInfo } from '@core/vo/comm/PageInfo';


export namespace EnterpriseBasicInfoServiceNs {

  export interface HazardDatas {
    temp:number;
    liquid:number;
    camera:number;
    alarm:number;
    pressure:number;
    poisonous:number;
    hazardInfo:number;
    combustible:number;
    major:number;
  }

  export interface EnterpriseInfoModel {
    id: number;
    entprName: string;
    entprSimpleName?: string;
    region?: string;
    detailAddr?: string;
    entprScope?: { lng: number, lat: number }[];
    longitude: number; // 经度
    latitude: number; // 纬度
    legalPerson?: string;
    legalMobile?: string;
    boss?: string;
    bossMobile?: string;
    safetyManager?: string;
    safetyMobile?: string;
    businessScope?: string;
    operatingStatus?: number;
    ecoType?: number;
    entprScale?: number;
    regCapi?: number;
    floorArea?: number;
    employeeNum?: number;
    specialOperationNum?: number;
    standLevel?: number;
    safetySupervisionLevel?: number;
    localSafetyAdmin?: number;
    safeOneMapDataNumDTO?:{
      major:number;
      alarm:number;
      temp:number;
      pressure:number;
      liquid:number;
      poisonous:number;
      combustible:number;
      camera:number;

    }
  }

  export interface EntprSearch {
    entprId: number;
  }

  export interface EnterpriseName extends EntprSearch {
    applicationName: string;
  }

  export class EnterpriseBasicInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

    public getEnterpriseInfoDetail(param: EntprSearch): Promise<EnterpriseInfoModel> {
      return this.http.get('data/basic/enterprise/' + param.entprId).toPromise();
    }

    /*修改接口*/
    public editEnterpriseInfoDetail(param: EntprSearch): Promise<EnterpriseInfoModel> {
      return this.http.put('data/basic/enterprise/' + param.entprId, param).toPromise();
    }

    /*企业提交审核*/
    public getExamine(param: EnterpriseName): Promise<PageInfo<EnterpriseInfoModel>> {
      return this.http.post('data/basic/enterprise/examination', param).toPromise();
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class EnterpriseBasicInfoService extends EnterpriseBasicInfoServiceNs.EnterpriseBasicInfoServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }

}
