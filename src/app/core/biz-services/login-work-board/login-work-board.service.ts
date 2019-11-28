import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';

export namespace LoginWorkBoardServiceNs {

  export interface AirQualityModel {
    'dateTime': string;
    'aqiValue': number;
    'mainPolluter': string;
    'status': number;
    'total': number;
    'rate': string;
    'goodDays': number;
    'noTwo': string;
    'soTwo': string;
    'pmTwoDotFive': string;
    'pmTen': string;
    'co': string;
    'othree': string;
  }

  export class LoginWorkBoardServiceClass {
    constructor(private http: HttpUtilService) {
    }

    // 获取空气质量
    public getAirQuality(): Promise<AirQualityModel> {
      return this.http.get('basic/subsystem/airQuality').toPromise();
    }
  }
}


@Injectable({
  providedIn: 'root',
})
export class LoginWorkBoardService extends LoginWorkBoardServiceNs.LoginWorkBoardServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }
}
