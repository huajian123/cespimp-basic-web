import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';
import { FormGroup } from '@angular/forms';

export namespace ProductionListServiceNs {
  export interface ProductionListInfoModel {
    id: number;
    placeNo: string;
    placeName: string;
    placeArea?: number;
    productionDate?: Date;
    longitude: number; // 经度
    latitude: number; // 纬度
    entprScope?: { lng: number, lat: number }[];
    locFactory?: string;
    majorHazardMaterials: FormGroup[];
    majorHazardMaterialInsertDTOS: FormGroup[];
  }

  export interface ProductionSearchModel{
    entprName?: string;
    placeNo?: string;
  }

  export class ProductionListInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

    /*新增接口*/
    public addProduction(param: ProductionListInfoModel): Promise<void> {
      return this.http.post('data/basic/enterprise/place', param, { needSuccessInfo: true }).toPromise();
    }

    /*修改接口*/
    public editProduction(param: ProductionListInfoModel): Promise<void> {
      return this.http.put('data/basic/enterprise/place', param, { needSuccessInfo: true }).toPromise();
    }

    public getProductionInfoDetail(id: number): Promise<ProductionListInfoModel> {
      return this.http.get('data/basic/enterprise/place/' + id).toPromise();
    }

    public getProductionList(param: SearchCommonVO & ProductionSearchModel): Promise<PageInfo<ProductionListInfoModel>> {
      return this.http.get('data/basic/enterprise/place', param).toPromise();
    }

    public delProductionInfo(id: number): Promise<ProductionListInfoModel> {
      return this.http.del('data/basic/enterprise/place/' + id).toPromise();
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
