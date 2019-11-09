import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import { ActionResult } from '@core/vo/comm/ActionResult';
import { environment, getwayKey } from '@env/environment';


export namespace HttpUtilNs {

  export interface UfastHttpRes {
    code: number;
    message: string;
  }

  export interface UfastFilterBody {
    filters: { [key: string]: any };
    pageSize: number;
    pageNum: number;
  }

  export enum HttpMethod {
    Post = 'POST',
    Get = 'GET'
  }


  export interface UfastHttpConfig {
    gateway?: string;
    headers?: HttpHeaders;
    params?: UfastHttpParams;
    needIntercept?: boolean;
    needSuccessInfo?: boolean;
    showLoading?: boolean;
  }

  export interface UfastHttpParams {
    [param: string]: string | any;
  }

  export class HttpUtilServiceClass {

    constructor(private http: _HttpClient) {

    }

    public post<T>(path: string, params?, config?: UfastHttpConfig, body?: any): Observable<any> {
      config = config || {};
      const url = this.getFullUrl(config.gateway, path);
      return this.http.post(url, params, body).pipe(map(item => item.data));
    }

    public getFullUrl(baseUrlName: string, path: string, isUpload?: boolean): string {
      const url = environment.baseUrl[baseUrlName || getwayKey.Bs] + path;
      return url;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class HttpUtilService extends HttpUtilNs.HttpUtilServiceClass {
  constructor(http: _HttpClient) {
    super(http);
  }
}



