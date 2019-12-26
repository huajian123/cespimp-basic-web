import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';

export namespace EnterpStatisticsInfoServiceNs {
  export interface EnterpStatisticsModel {
    statisticsEntprScaleDTOS: EntprScaleDTOS[];
    statisticsEntprStandLevelDTOS: EntprStandLevelDTOS[];
    statisticsEntprEcoDTOS: EntprEcoDTOS[];
  }

  export interface EntprSearch {
    entprId: number;
  }

  export interface EntprScaleDTOS {
    entprScale: number;
    entprNum: number;
  }

  export interface EntprStandLevelDTOS {
    standLevel: number;
    entprNum: number;
  }

  export interface EntprEcoDTOS {
    entprEcoType: number;
    entprEcoRatio: number;
  }

  export enum EntprScaleModel {
    entprScaleLm = 1,
    entprScaleXm,
    entprScaleSm
  }

  export enum EntprStandLevelModel {
    entprStandLevelLm = 1,
    entprStandLevelXm,
    entprStandLevelSm
  }

  export enum EntprEcoModel {
    ShareHoldingSystem = 1,
    ForeignInvestment,
    EntprEcoInvestment,
    PrivateEconomy,
    CollectiveEconomy,
    IndividualEconomy,
    StateOwnedEconomy,
    JointVentureEconomy,
    Other
  }

  export class EnterpStatisticsServiceClass {
    constructor(private http: HttpUtilService) {
    }

    /*企业基本信息详情接口*/
    public getEnterpStatisticsInfoDetail(param: void): Promise<EnterpStatisticsModel> {
      return this.http.get('data/basic/enterprise/statistics', param).toPromise();
    }


  }
}

@Injectable({
  providedIn: 'root',
})
export class EnterpStatisticsInfoService extends EnterpStatisticsInfoServiceNs.EnterpStatisticsServiceClass {
  constructor(http: HttpUtilService) {
    super(http);
  }

}
