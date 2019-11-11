import { Injectable, Injector } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';


export namespace BasicInfoServiceNs {
  export interface FactoryInfoModel {
    id: number;
    entprName: string;
    entprSimpleName?: string;
    region?: string;
    detailAddr?: string;
    entprScope?: string;
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
    majorHazardFlag?: number;
    majorHazardLevel?: number;
  }

 /* export interface BinsSearch extends SearchCommonVO{
    name:string;
  }*/

  export class BasicInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

    public getFactoryInfoModel(): Promise<FactoryInfoModel> {
      return this.http.post('basic/info/query', null).toPromise();
    }

    public getFactoryList(param: SearchCommonVO): Promise<PageInfo<FactoryInfoModel>> {
      return this.http.get('data/basic/enterprises', param).toPromise();
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class BasicInfoService extends BasicInfoServiceNs.BasicInfoServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }

}
