import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';
export namespace ProductionListServiceNs {
  export interface ProductionListInfoModel {
    id: number;
    placeNo: string;
    placeName: string;
    placeArea?: number;
    productionDate?: Date;
    longitude: number; // 经度
    latitude: number; // 纬度
    locFactory?: string;
  }

  export interface EntprSearch {
    entprId?: number;
  }

 /* export interface EntprSearch extends SearchCommonVO {
    entprId: number;
  }*/

  export class ProductionListInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

    public getProductionInfoDetail(param: EntprSearch): Promise<ProductionListInfoModel> {
      return this.http.get('data/basic/enterprise/'+param.entprId).toPromise();
    }

    public getProductionList(param: SearchCommonVO): Promise<PageInfo<ProductionListInfoModel>> {
      return this.http.get('data/basic/enterprise/place', param).toPromise();
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class ProductionListInfoService extends ProductionListServiceNs.ProductionListInfoServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }

}
