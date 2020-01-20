import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import { ActionResult } from '@core/vo/comm/ActionResult';
import { environment, getwayKey } from '@env/environment';
import { MessageType, ShowMessageService } from '../../widget/show-message/show-message';


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

    constructor(private http: _HttpClient, private messageService: ShowMessageService) {

    }

    public post<T>(path: string, params?, config?: UfastHttpConfig, body?: any): Observable<any> {
      config = config || {};
      const url = this.getFullUrl(config.gateway, path);
      return this.http.post(url, params, body).pipe(filter((item) => this.handleFilter(item, config.needSuccessInfo)), map(item => (item as ActionResult<T>).data));
    }

    handleFilter(item, needSuccessInfo) {
      if (item.code !== 0) {
        this.messageService.showAlertMessage('', item.msg, MessageType.Warning);
      } else if (needSuccessInfo) {
        this.messageService.showToastMessage('操作成功', MessageType.Success);
      }
      return item.code === 0;
    }


    public get<T>(path: string, params?, config?: UfastHttpConfig): Observable<any> {
      config = config || {};
      const url = this.getFullUrl(config.gateway, path);
      return this.http.get(url, params, config).pipe(filter((item) => this.handleFilter(item, config.needSuccessInfo)), map(item => (item as ActionResult<T>).data));
    }

    public put<T>(path: string, params?, config?: UfastHttpConfig): Observable<any> {
      config = config || {};
      const url = this.getFullUrl(config.gateway, path);
      return this.http.put(url, params, config).pipe(filter((item) => this.handleFilter(item, config.needSuccessInfo)), map(item => (item as ActionResult<T>).data));
    }

    public del<T>(path: string, params?, config?: UfastHttpConfig): Observable<any> {
      config = config || {};
      const url = this.getFullUrl(config.gateway, path);
      return this.http.delete(url, params, config).pipe(filter((item) => this.handleFilter(item, config.needSuccessInfo)), map(item => (item as ActionResult<T>).data));
    }

    public getFullUrl(baseUrlName: string, path: string, isUpload?: boolean): string {
      const url = environment.baseUrl[baseUrlName || getwayKey.Bs] + path + '?_allow_anonymous=true';
      return url;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class HttpUtilService extends HttpUtilNs.HttpUtilServiceClass {
  constructor(http: _HttpClient, messageService: ShowMessageService) {
    super(http, messageService);
  }
}



