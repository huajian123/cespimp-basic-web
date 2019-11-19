import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';
export namespace TankListServiceNs {
  export interface TankListInfoModel {
    id: number;
    tankNo: string;
    tankName?: string;
    tankType: number;
    tankForm?: number;
    tankStructure?: number;
    longitude: number; // 经度
    latitude: number; // 纬度
    tankMate?: number;
    tamkCapacity?: number;
    productionDate?: Date;
    locFactory?: string;
  }

  export class TankListInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }
    /*新增接口*/
    public addTank(param:TankListInfoModel): Promise<void> {
      return this.http.post('data/basic/enterprise/tanks',param,{needSuccessInfo: true}).toPromise();
    }
    /*修改接口*/
    public editTank(param: TankListInfoModel): Promise<void> {
      return this.http.put('data/basic/enterprise/tanks',param,{needSuccessInfo: true}).toPromise();
    }

    public getTankInfoDetail(id: number): Promise<TankListInfoModel> {
      return this.http.get('data/basic/enterprise/tanks/'+id).toPromise();
    }

    public getTankList(param: SearchCommonVO ): Promise<PageInfo<TankListInfoModel>> {
      return this.http.get('data/basic/enterprise/tanks', param).toPromise();
    }
    public delTankInfo(id: number): Promise<TankListInfoModel> {
      return this.http.del('data/basic/enterprise/tanks/'+ id).toPromise();
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class TankListInfoService extends TankListServiceNs.TankListInfoServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }

}
