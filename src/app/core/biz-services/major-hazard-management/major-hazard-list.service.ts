import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';
export namespace MajorHazardListServiceNs {
  export interface MajorHazardListInfoModel {
    id: number;
    majorHazardNo: string;
    majorHazardName: string;
    unitType: number;
    useDate?: Date;
    majorHazardLevel: number;
    majorHazardNature?: number;
    rValue?: number;
    majorHazardDescription?:string;
  }

  export interface EntprSearch {
    entprId: number;
  }

  export class MajorHazardListInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

    public getMajorHazardInfoDetail(param: EntprSearch): Promise<MajorHazardListInfoModel> {
      return this.http.get('data/basic/enterprise/'+param.entprId).toPromise();
    }

    public getMajorHazardList(param: SearchCommonVO): Promise<PageInfo<MajorHazardListInfoModel>> {
      return this.http.get('data/basic/enterprises', param).toPromise();
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class MajorHazardListInfoService extends MajorHazardListServiceNs.MajorHazardListInfoServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }

}
