import { Injectable, Injector } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { HttpUtilService } from '@core/net/http-util.service';
import { getwayKey } from '@env/environment';

export namespace BasicInfoServiceNs {
  export interface LoginInfoModel {
    basicInfo: UserInfoModel;
    userDTO: IsLoginUserModel;
  }

  export interface IsLoginUserModel {
    id: number;
    account: string;
  }

  export interface UserInfoModel {
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

    public getUserInfo(): Promise<UserInfoModel> {
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
