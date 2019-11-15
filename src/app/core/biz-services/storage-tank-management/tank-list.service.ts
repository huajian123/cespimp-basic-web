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
  export interface EntprSearch {
    entprId?: number;
  }
 /* export interface EntprSearch extends SearchCommonVO {
    entprId: number;
 }*/
  export class TankListInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

    public getTankInfoDetail(entprId: number): Promise<TankListInfoModel> {
      return this.http.get('data/basic/enterprise/'+'entprId').toPromise();
    }

    public getTankList(param: SearchCommonVO ): Promise<PageInfo<TankListInfoModel>> {
      return this.http.get('data/basic/enterprise/tanks', param).toPromise();
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
