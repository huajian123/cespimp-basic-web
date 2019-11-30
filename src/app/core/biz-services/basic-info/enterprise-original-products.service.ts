import { Injectable } from '@angular/core';
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
    RawMateriPro = 1, // 生产原料
    MidPro, // 中间产品
    FinalPro // 最终产品
  }

  export interface EntprPageSearchModel extends SearchCommonVO {
    entprId: number;
  }

  export interface EntprProductSearchModel extends EntprPageSearchModel {
    productType: ProductEnum;
  }

  export class EnterpriseOriginalProductServiceClass {
    constructor(private http: HttpUtilService) {
    }
    // 获取企业产品列表
    public getEnterProductList(param: EntprProductSearchModel): Promise<PageInfo<EnterpriseProductModel>> {
      return this.http.get('data/basic/enterprise/products/', param).toPromise();
    }

    /*详情*/
    public getEnterProductInfoDetail(id: number): Promise<EnterpriseProductModel> {
      return this.http.get('data/basic/enterprise/products/' + id).toPromise();
    }

    /*修改接口*/
    public editEnterProductInfoDetail(param: EnterpriseProductModel): Promise<EnterpriseProductModel> {
      return this.http.put('data/basic/enterprise/products/', param).toPromise();
    }

    /*新增*/
    public addProductionMaterialsInfo(param: EnterpriseProductModel): Promise<void> {
      return this.http.post('data/basic/enterprise/products', param).toPromise();
    }

    /*删除*/
    public delEnterProductInfo(id: number): Promise<EnterpriseProductModel> {
      return this.http.del('data/basic/enterprise/products/'+ id).toPromise();
    }

  }
}

@Injectable({
  providedIn: 'root',
})
export class EnterpriseOriginalProductService extends EnterpriseOriginalProductServiceNs.EnterpriseOriginalProductServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }

}
