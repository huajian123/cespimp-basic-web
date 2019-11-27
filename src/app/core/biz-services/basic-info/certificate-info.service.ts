import { Injectable, Injector } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';

export namespace CertificateInfoServiceNs {
  export interface IdCardTabModel {
    id: number;
    uscCode: string;
    businessLicencesBeginTime?: Date;
    businessLicencesEndTime?: Date;
    businessLicencesRange?: string;
    businessLicencesAuthority?: string;
    businessLicencesAccessory?: string;
    safetyCertificateCode?: string;
    safetyCertificateBeginTime?: Date;
    safetyCertificateEndTime?: Date;
    safetyPermitRange?: string;
    safetyCertificateAuthority?: string;
    safetyCertificateAccessory?: string;
    dischargePermitCode?: string;
    dischargePermitBeginTime?: Date;
    dischargePermitEndTime?: Date;
    dischargePermitType?: string;
    dischargePermitAuthority?: string;
    safetyReportName?: string;
    safetyReportRecordTime?: Date;
    safetyReportAgency?: string;
    safetyReportAccessory?: string;
    environmentReportName?: string;
    environmentRecordTime?: Date;
    environmentReportAgency?: string;
    environmentReportAccessory?: string;
    dischargePermitAccessory?: string;
    effectiveRange: [Date, Date];
    effectiveRange1: [Date, Date];
    effectiveRange2: [Date, Date];
  }

   export interface EntprSearch {
     entprId: number;
   }


  export class CertificateInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

    /*证照详情接口*/
    public getIdCardInfoDetail(id: number): Promise<IdCardTabModel> {
      return this.http.get('data/basic/document/' + id).toPromise();
    }

  }
}

@Injectable({
  providedIn: 'root',
})
export class CertificateInfoService extends CertificateInfoServiceNs.CertificateInfoServiceClass {
  constructor(http: HttpUtilService) {
    super(http);
  }

}
