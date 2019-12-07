import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ACLService } from '@delon/acl';

import { NzIconService } from 'ng-zorro-antd/icon';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';
import { menus } from '@env/menu';
import { appInfo, loginUserInfo } from '@env/environment';
import { ReuseTabMatchMode, ReuseTabService } from '@delon/abc';
import { EVENT_KEY } from '@env/staticVariable';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private injector: Injector,
    public aclSrv: ACLService,
    public reuseTabService: ReuseTabService,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
    this.reuseTabService.mode = ReuseTabMatchMode.URL;
    this.reuseTabService.excludes = [/\/passport\/login/, /hazard\/login-manage\/login-plant/];
  }

  private viaHttp(resolve: any, reject: any) {
    zip(
      this.httpClient.get('assets/tmp/app-data.json'),
    ).pipe(
      catchError(([appData]) => {
        resolve(null);
        return [appData];
      }),
    ).subscribe(([appData]) => {

        // Application data
        const res: any = appData;
        // Application information: including site name, description, year
        this.settingService.setApp(res.app);
        // User information: including name, avatar, email address
        this.settingService.setUser(res.user);
        // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
        this.aclService.setFull(true);
        // Menu data, https://ng-alain.com/theme/menu
        this.menuService.add(res.menu);
        // Can be set page suffix title, https://ng-alain.com/theme/title
        this.titleService.suffix = res.app.name;
      },
      () => {
      },
      () => {
        resolve(null);
      });
  }

  /*  private viaMock(resolve: any, reject: any) {
      // const tokenData = this.tokenService.get();
      // if (!tokenData.token) {
      //   this.injector.get(Router).navigateByUrl('/hazard/passport/login');
      //   resolve({});
      //   return;
      // }
      // mock
      const app: any = {
        name: `ng-alain`,
        description: `Ng-zorro admin panel front-end framework`
      };
      const user: any = {
        name: 'Admin',
        avatar: './assets/tmp/img/avatar.jpg',
        email: 'cipchk@qq.com',
        token: '123456789'
      };
      // Application information: including site name, description, year
      this.settingService.setApp(app);
      // User information: including name, avatar, email address
      this.settingService.setUser(user);
      // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
      this.aclService.setFull(true);
      // Menu data, https://ng-alain.com/theme/menu
      this.menuService.add([
        {
          text: '主菜单',
          group: true,
          children: [
            {
              text: '智慧厂区',
              link: '/dashboard',
              icon: { type: 'icon', value: 'appstore' }
            },
            {
              text: '详情页面',
              icon: { type: 'icon', value: 'rocket' },
              shortcutRoot: true
            }
          ]
        }
      ]);
      // Can be set page suffix title, https://ng-alain.com/theme/title
      this.titleService.suffix = app.name;

      resolve({});
    }*/

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      // this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      // this.viaMock(resolve, reject);
      //  const res: any = appData;
      // 应用信息：包括站点名、描述、年份
      this.settingService.setApp(appInfo);
      // 用户信息：包括姓名、头像、邮箱地址
      if (JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo))) {
        loginUserInfo.name = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.loginInfo)).userName;
      } else {
        loginUserInfo.name = 'admin';
      }

      this.settingService.setUser(loginUserInfo);
      // ACL：设置权限为全量
      // this.aclService.setFull(true);
      const currentRole = window.sessionStorage.getItem('role');
      if (currentRole) {
        this.aclService.set({ role: [currentRole] });
      }
      // 初始化菜单
      this.menuService.add(menus);
      // 设置页面标题的后缀
      this.titleService.default = '苏州园区';
      this.titleService.suffix = '苏州工业园';
      return resolve();
    });
  }
}
