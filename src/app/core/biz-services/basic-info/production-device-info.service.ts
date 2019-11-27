import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';

export namespace ProductionDeviceInfoListServiceNs {
  export interface ProductionDeviceListInfoModel {
    id: number;
    deviceNo: string;
    deviceName: string;
    deviceModel?: string;
    deviceFunction?: string;
  }

  export class ProductionDeviceListInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

    /*生产装置新增接口*/
    public addProductionDevice(param: ProductionDeviceListInfoModel): Promise<void> {
      return this.http.post('data/basic/enterprise/devices', param, { needSuccessInfo: true }).toPromise();
    }

    /*生产装置修改接口*/
    public editProductionDevice(param: ProductionDeviceListInfoModel): Promise<void> {
      return this.http.put('/data/basic/enterprise/devices', param, { needSuccessInfo: true }).toPromise();
    }

    /*生产装置详情*/
    public getProductionDeviceInfoDetail(id: number): Promise<ProductionDeviceListInfoModel> {
      return this.http.get('data/basic/enterprise/devices/' + id).toPromise();
    }

    /*生产装置列表*/
    public getProductionDeviceList(param: SearchCommonVO): Promise<PageInfo<ProductionDeviceListInfoModel>> {
      return this.http.get('data/basic/enterprise/devices', param).toPromise();
    }

    /*生产装置删除接口*/
    public delProductionDeviceInfo(id: number): Promise<ProductionDeviceListInfoModel> {
      return this.http.del('data/basic/enterprise/devices/' + id).toPromise();
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class ProductionDeviceListInfoService extends ProductionDeviceInfoListServiceNs.ProductionDeviceListInfoServiceClass {
  constructor(http: HttpUtilService) {
    super(http);
  }

}
