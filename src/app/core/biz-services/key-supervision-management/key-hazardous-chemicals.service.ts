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

  export class HazardousChemicalInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }
    /*新增接口*/
    public addHazardousChemical(param:HazardousChemicalInfoModel): Promise<void> {
      return this.http.post('data/major/hazard/chemicals',param,{needSuccessInfo: true}).toPromise();
    }
    /*修改接口*/
    public editHazardousChemical(param: HazardousChemicalInfoModel): Promise<void> {
      return this.http.put('data/major/hazard/chemicals',param,{needSuccessInfo: true}).toPromise();
    }
   /*查询详情*/
    public getHazardousChemicalInfoDetail(id: number): Promise<HazardousChemicalInfoModel> {
      return this.http.get('data/major/hazard/chemicals/'+id).toPromise();
    }
    /*查询列表*/
    public getHazardousChemicalList(param: SearchCommonVO): Promise<PageInfo<HazardousChemicalInfoModel>> {
      return this.http.get('data/major/hazard/chemicals', param).toPromise();
    }
    /*删除接口*/
    public delHazardousChemical(id: number): Promise<HazardousChemicalInfoModel> {
      return this.http.del('data/major/hazard/chemicals/'+ id).toPromise();
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
