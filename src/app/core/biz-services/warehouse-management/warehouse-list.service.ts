import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';
import { FormGroup } from '@angular/forms';

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
    majorHazardMaterials: FormGroup[];
    majorHazardMaterialInsertDTOS: FormGroup[];
  }

  export class WarehouseListInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

    /*新增接口*/
    public addWarehouse(param: WarehouseListInfoModel): Promise<void> {
      return this.http.post('data/basic/enterprise/rooms', param, { needSuccessInfo: true }).toPromise();
    }

    /*修改接口*/
    public editWarehouse(param: WarehouseListInfoModel): Promise<void> {
      return this.http.put('data/basic/enterprise/rooms', param, { needSuccessInfo: true }).toPromise();
    }

    /*库房详情*/
    public getWarehouseInfoDetail(id: number): Promise<WarehouseListInfoModel> {
      return this.http.get('data/basic/enterprise/rooms/' + id).toPromise();
    }

    /*库房列表*/
    public getWarehouseList(param: SearchCommonVO): Promise<PageInfo<WarehouseListInfoModel>> {
      return this.http.get('data/basic/enterprise/rooms', param).toPromise();
    }

    /*删除接口*/
    public delWarehouseInfo(id: number): Promise<WarehouseListInfoModel> {
      return this.http.del('data/basic/enterprise/rooms/' + id).toPromise();
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
