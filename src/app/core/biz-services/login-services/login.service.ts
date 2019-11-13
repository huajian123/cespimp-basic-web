import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';



export namespace LoginServiceNs {
  export interface LoginUserModel {
    id:number;
    entprId:number;
    userName:string;
    password:string;
    realName:string;
    mobileTel:string;
    role:number;
  }


  export class LoginServiceClass {
    constructor(private http: HttpUtilService) {
    }

    public login(param: { username: string, password: string }): Promise<LoginUserModel> {
      return this.http.post('user/login?_allow_anonymous=true', param).toPromise();
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
