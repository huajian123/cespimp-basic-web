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
    miniDistance: number;
    buildStruct: string;
    adjacentBuildHeight: number;
    personNum: number;
    envrContacts?: string;
    contactMoble?: string;
    longitude?: string;
    latitude?: string;
  }
  export interface EntprSearch {
    entprId: number;
  }
/*  export interface EnterpriseName extends EntprSearch{
    applicationName:string;
  }*/
  export class  EnterpriseSurroundingInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

    public getEnterpriseInfoDetail(id: number): Promise<EnterpriseSurroundingModel> {
      return this.http.get('data/basic/enterprise/environments/' + id).toPromise();
    }

    public getEnterpriseSurroundingList(param: SearchCommonVO): Promise<PageInfo<EnterpriseSurroundingModel>> {
      return this.http.get('data/basic/enterprise/environments', param).toPromise();
    }
    public addEnterpriseSurrounding(param: EnterpriseSurroundingModel): Promise<void> {
      return this.http.post('data/basic/enterprise/environments', param).toPromise();
    }

    public editEnterpriseSurrounding(param: EnterpriseSurroundingModel): Promise<EnterpriseSurroundingModel> {
      return this.http.put('data/basic/enterprise/environments', param).toPromise();
    }

    public delEnterpriseSurrounding(id: number): Promise<EnterpriseSurroundingModel> {
      return this.http.del('data/basic/enterprise/environments/' + id).toPromise();
    }
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
