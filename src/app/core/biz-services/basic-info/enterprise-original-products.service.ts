import { Injectable, Injector } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { PageInfo } from '@core/vo/comm/PageInfo';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';


export namespace EnterpriseOriginalProductServiceNs {
  export interface EnterpriseProductModel {
    id: number;
    entprId: number;
    productType: ProductEnum;
    productName: string;
    alias: string;
    casNo: string;
    annualConsumption: number;
    annualThroughput: number;
    maximumReserves: number;
  }

  export enum ProductEnum {
    RawMateriPro = 1, //生产原料
    MidPro, // 中间产品
    FinalPro // 最终产品
  }

  export interface EntprPageSearchModel extends SearchCommonVO {
    entprId: number;
  }

  export interface EntprProductSearchModel extends EntprPageSearchModel {
    productType: ProductEnum;
  }

  export class  EnterpriseOriginalProductServiceClass {
    constructor(private http: HttpUtilService) {
    }

    /* public getEnterpriseInfoDetail(param: EntprSearch): Promise<EnterpriseInfoModel> {
       return this.http.get('data/basic/enterprise/' + param.entprId).toPromise();
     }*/
    // 获取企业产品列表
    public getEnterProduct(param: EntprProductSearchModel): Promise<PageInfo<EnterpriseProductModel>> {
      return this.http.get('data/basic/enterprise/products/', param).toPromise();
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
export class  EnterpriseOriginalProductService extends EnterpriseOriginalProductServiceNs. EnterpriseOriginalProductServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }

}
