import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';
export namespace WarehouseListServiceNs {
  export interface WarehouseListInfoModel {
    id: number;
    roomNo: string;
    roomName: string;
    roomArea?: number;
    roomForm?: number;
    fireLevel?: number;
    longitude: number; // 经度
    latitude: number; // 纬度
    locFactory?: string;
  }

  export interface EntprSearch {
    entprId?: number;
  }
 /* export interface EntprSearch extends SearchCommonVO {
    entprId: number;
  }
*/
  export class WarehouseListInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

    public getWarehouseInfoDetail(param: EntprSearch): Promise<WarehouseListInfoModel> {
      return this.http.get('data/basic/enterprise/'+param.entprId).toPromise();
    }

    public getWarehouseList(param: SearchCommonVO): Promise<PageInfo<WarehouseListInfoModel>> {
      return this.http.get('data/basic/enterprise/rooms', param).toPromise();
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class WarehouseListInfoService extends WarehouseListServiceNs.WarehouseListInfoServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }

}
