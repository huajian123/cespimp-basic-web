import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';

export namespace HazardousChemicalListServiceNs {
  export interface HazardousChemicalInfoModel {
    id: number;
    productName: string;
    alias: string;
    casNo?: string;
  }

  export interface EntprSearch {
    entprId?: number;
  }
  /* export interface EntprSearch extends SearchCommonVO {
     entprId: number;
   }
 */
  export class HazardousChemicalInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

    public getHazardousChemicalInfoDetail(param: EntprSearch): Promise<HazardousChemicalInfoModel> {
      return this.http.get('data/basic/enterprise/'+param.entprId).toPromise();
    }

    public getHazardousChemicalList(param: SearchCommonVO): Promise<PageInfo<HazardousChemicalInfoModel>> {
      return this.http.get('data/basic/enterprise/chemicals', param).toPromise();
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class HazardousChemicalInfoService extends HazardousChemicalListServiceNs.HazardousChemicalInfoServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }

}
