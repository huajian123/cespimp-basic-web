import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';

export namespace MajorHazardStatisticsInfoServiceNs {
  export interface EnterpHazardStatisticsModel {
    level: EnterpHazardModel[];
    gas: EnterpGasModel[];
  }

  export interface EnterpHazardModel {
    majorHazardLevel: number;
    majorHazardRatio: number;
    majorHazardNum: number;
  }

  export interface EnterpGasModel {
    gas: number,
    entprNum: number,
    gasRatio: number,
  }

  export interface EntprSearch {
    entprId: number;
  }

  export enum MajorHazarderModel {
    HazardlevelSm = 1,
    HazardlevelXm,
    HazardlevelLm,
    HazardlevelGm = 4
  }

  export enum MajorHazarderGasModel {
    HazardGaslevelSm = 1,
    HazardGaslevelXm,
    HazardGaslevelLm,
  }

  export class EnterpriseHazardStatisticsServiceClass {
    constructor(private http: HttpUtilService) {
    }

    /*重大危险源信息详情接口*/
    public getEnterpriseInfoDetail(param: void): Promise<EnterpHazardStatisticsModel> {
      return this.http.get('data/major/hazard/statistics', param, { needSuccessInfo: true }).toPromise();
    }

  }
}

@Injectable({
  providedIn: 'root',
})
export class MajorHazardStatisticsInfoService extends MajorHazardStatisticsInfoServiceNs.EnterpriseHazardStatisticsServiceClass {
  constructor(http: HttpUtilService) {
    super(http);
  }

}
