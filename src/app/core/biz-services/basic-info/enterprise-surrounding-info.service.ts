import { Injectable, Injector } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { PageInfo } from '@core/vo/comm/PageInfo';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';

export namespace EnterpriseSurroundingInfoServiceNs {
  export interface EnterpriseSurroundingModel {
    id: number;
    envrType: string;
    envrName: string;
    envrDirection: string;
    miniDistance: string;
    buildStruct: string;
    adjacentBuildHeight: number;
    personNum: number;
    envrContacts?: string;
    contactMoble?: string;
    longitude: string;
    latitude: string;
  }
  export interface EntprSearch {
    entprId: number;
  }
  export interface EnterpriseName extends EntprSearch{
    applicationName:string;
  }
  export class  EnterpriseSurroundingInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

   /* public getEnterpriseInfoDetail(param: EntprSearch): Promise<EnterpriseInfoModel> {
      return this.http.get('data/basic/enterprise/' + param.entprId).toPromise();
    }*/
    public getEnterpriseSurroundingList(param: SearchCommonVO): Promise<PageInfo<EnterpriseSurroundingModel>> {
      return this.http.get('data/basic/enterprise/environments', param).toPromise();
    }
    /*修改接口*/
   /* public editEnterpriseInfoDetail(param: EntprSearch): Promise<EnterpriseInfoModel> {
      return this.http.put('data/basic/enterprise/' + param.entprId, param).toPromise();
    }*/

    /*企业提交审核*/
  /*  public getExamine(param: EnterpriseName): Promise<PageInfo<EnterpriseInfoModel>> {
      return this.http.post('data/basic/enterprise/examination', param).toPromise();
    }*/
  }
}

@Injectable({
  providedIn: 'root',
})
export class  EnterpriseSurroundingInfoService extends EnterpriseSurroundingInfoServiceNs. EnterpriseSurroundingInfoServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }

}
