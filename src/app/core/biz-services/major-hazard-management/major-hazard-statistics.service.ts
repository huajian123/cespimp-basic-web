import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';

export namespace MajorHazardStatisticsInfoServiceNs {
  export interface EnterpHazardStatisticsModel {
    majorHazardLevel?: number;
    majorHazardRatio?: string;
    majorHazardNum?: string;
  }

  export interface EntprSearch {
    entprId: number;
  }

  export class EnterpriseHazardStatisticsServiceClass {
    constructor(private http: HttpUtilService) {
    }

    /*重大危险源信息详情接口*/
    public getEnterpriseInfoDetail(param: void): Promise<EnterpHazardStatisticsModel> {
      return this.http.get('data/major/hazard/statistics', param, { needSuccessInfo: true }).toPromise();
    }

    /*修改详情接口*/
    /*  public editIdCardInfoDetail(param:IdCardTabModel): Promise<IdCardTabModel> {
        return this.http.put('data/basic/document/',param).toPromise();
      }*/
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
