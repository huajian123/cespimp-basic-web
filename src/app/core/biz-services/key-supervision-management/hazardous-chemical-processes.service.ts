import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';

export namespace HazardousChemicalProcessesListServiceNs {
  export interface HazardousChemicalProcessesInfoModel {
    id: number;
    processName: string;
  }

  export interface EntprSearch {
    entprId?: number;
  }
  /* export interface EntprSearch extends SearchCommonVO {
     entprId: number;
   }
 */
  export class HazardousChemicalProcessesInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

    public getHazardousChemicalProcessesInfoDetail(param: EntprSearch): Promise<HazardousChemicalProcessesInfoModel> {
      return this.http.get('data/basic/enterprise/'+param.entprId).toPromise();
    }

    public getHazardousChemicalProcessesList(param: SearchCommonVO): Promise<PageInfo<HazardousChemicalProcessesInfoModel>> {
      return this.http.get('data/basic/enterprise/processes', param).toPromise();
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class HazardousChemicalProcessesInfoService extends HazardousChemicalProcessesListServiceNs.HazardousChemicalProcessesInfoServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }

}
