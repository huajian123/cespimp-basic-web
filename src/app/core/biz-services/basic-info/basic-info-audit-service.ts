import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';

export namespace BasicInfoAuditServiceNs {
  export interface BasicInfoAuditModel {
    id?: number;
    applicationName?: string;
    applicationTime?: Date;
    reviewName: string;
    reviewTime?: Date;
    reviewExplain: string;
    reviewStatus: number;
  }

/*  export interface EntprSearch {
    entprId: number;
  }*/

  /*定义搜索的接口*/
  export interface FiltersInfoModel {
    entprName?: number;
    reviewStatus?: number;
  }
  /*定义入参的接口*/
  export interface EntprSearchModel extends SearchCommonVO {
    entprId?: number;
    reviewStatus?: number;
  }


  export class BasicInfoAuditServiceClass {
    constructor(private http: HttpUtilService) {
    }

    public getBasicInfoAuditInfoDetail(id: number): Promise<BasicInfoAuditModel> {
      return this.http.get('data/basic/enterprise/examination/' + id).toPromise();
    }

    /*处理审核接口*/
    public getIdCardInfoDetail(param: BasicInfoAuditModel): Promise<BasicInfoAuditModel> {
      return this.http.put('data/basic/enterprise/examination/' + param.id, param).toPromise();
    }

    public getFactoryAuditList(param: EntprSearchModel & FiltersInfoModel): Promise<PageInfo<BasicInfoAuditModel>> {
      return this.http.get('data/basic/enterprise/examinations', param).toPromise();
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class BasicInfoAuditService extends BasicInfoAuditServiceNs.BasicInfoAuditServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }

}
