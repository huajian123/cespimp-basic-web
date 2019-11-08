import { Injectable, Injector } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { map } from 'rxjs/operators';

export namespace BasicInfoServiceNs {
  export interface LoginInfoModel {
    basicInfo: FactoryInfoModel;
    userDTO: IsLoginUserModel;
  }

  export interface IsLoginUserModel {
    id: number;
    account: string;
  }

  export interface FactoryInfoModel {
    id: number;
    enterpriseName: string;
    area: string;
    businessLicense: string;
    nature: string;
    industry: string;
    address: string;
    contacts: string;
    telephone: string;
    legalPerson: string;
    scale: string;
    planeLayout: string;
    environment: string;
    longitude: number; // 经度
    latitude: number; // 纬度
    zoom?: number; // 放大倍数
  }

  export class BasicInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

    public getFactoryInfoModel(): Promise<FactoryInfoModel> {
      return this.http.post('/basic/info/query', null).toPromise();
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
