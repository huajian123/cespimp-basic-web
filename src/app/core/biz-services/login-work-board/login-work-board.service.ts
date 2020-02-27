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

  export interface WaterQualityModel {
    'levelOne': number;
    'levelTwo': number;
    'levelThree': number;
    'levelFour': number;
    'levelFive': number;
    'levelSix': number;
    'siteName': string;
    'dissolveOxygen': number;
    'ammoniaNitrogen': number;
    'standardLevel': number;
    'totalPhosphorus': number;
    'thisLevel': number;
    'overFlag': boolean,
    'permanganate': number;
    'itemNames': string[],
    'totalNitrogen': number;
    'ph': number;
  }

  export class LoginWorkBoardServiceClass {
    constructor(private http: HttpUtilService) {
    }

    // 获取空气质量
    public getAirQuality(): Promise<AirQualityModel> {
      return this.http.get('basic/subsystem/airQuality').toPromise();
    }

    // 获取水质质量
    public getWaterQuality(): Promise<WaterQualityModel> {
      return this.http.get('basic/subsystem/waterQuality').toPromise();
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
