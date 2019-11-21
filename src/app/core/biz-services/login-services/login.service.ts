import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';


export namespace LoginServiceNs {
  export interface UrlsModelInterface {
    synthesisMonitoring: {
      oneGrandOneFile: string;
      levelAlarm: string;
      ldar: string;
      workingMonitoring: string;
    },
    emergencyDTO: {
      emergency: string;
    },
    environmentalDTO: {
      environmentalLogin: string;
      environmentalMap: string;
      capacityMonitoring: string;
      dataResearch: string;
      polluteSource: string;
    },
    gardenDTO: {
      garden: string;
    }
  }


  export interface LoginModel {
    user: LoginUserModel;
    entprBasicInfo: LoginEntprModel;
  }

  export interface LoginUserModel {
    id: number;
    entprId: number;
    userName: string;
    password: string;
    realName: string;
    mobileTel: string;
    role: number;
  }

  export interface LoginEntprModel {
    id: number;
    entprId: number;
    latitude: number;
    longitude: number;
    zoom: number;
  }

  export class LoginServiceClass {
    constructor(private http: HttpUtilService) {
    }

    public login(param: { username: string, password: string }): Promise<LoginModel> {
      return this.http.post('user/login', param).toPromise();
    }

    public getLoginUrls(): Promise<UrlsModelInterface> {
      return this.http.post('basic/subsystem/login').toPromise();
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class LoginService extends LoginServiceNs.LoginServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }

}
