import { SettingsService, _HttpClient, MenuService } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core';
import { LoginService } from '@core/biz-services/login-services/login.service';
import { ACLService } from '@delon/acl';
import { RoleEnum } from '@core/vo/comm/BusinessEnum';
import { EVENT_KEY } from '@env/staticVariable';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent {
  validateForm: FormGroup;
  remark: string;
  loading: boolean;
  currentErrorMsg: string;
  isSubmit: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router, private dataService: LoginService,
              fb: FormBuilder,
              modalSrv: NzModalService,
              private settingsService: SettingsService,
              private socialService: SocialService,
              @Optional()
              @Inject(ReuseTabService)
              private reuseTabService: ReuseTabService,
              @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
              private startupSrv: StartupService,
              public http: _HttpClient,
              public msg: NzMessageService,
              private loginService: LoginService,
              private aclService: ACLService,
              private menuSrv: MenuService) {
    this.remark = '';
    this.loading = false;
    this.isSubmit = true;
    this.currentErrorMsg = '';
  }


  public async loginSubmit() {
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls[key]) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
    if (this.validateForm.invalid) {
      return this.isSubmit = false;
    }
    const params = this.validateForm.getRawValue();
    const data = await this.loginService.login({ username: params.userAccount, password: params.password });
    window.sessionStorage.removeItem(EVENT_KEY.loginInfo);
    window.sessionStorage.removeItem(EVENT_KEY.entprBasicInfo);
    window.sessionStorage.removeItem(EVENT_KEY.role);
    // 清空路由复用信息
    this.reuseTabService.clear();
    this.aclService.set({ role: [RoleEnum[data.user.role]] });
    window.sessionStorage.setItem(EVENT_KEY.role, [RoleEnum[data.user.role]].toString());
    window.sessionStorage.setItem(EVENT_KEY.loginInfo, JSON.stringify(data.user));
    window.sessionStorage.setItem(EVENT_KEY.entprBasicInfo, JSON.stringify(data.entprBasicInfo));
    this.menuSrv.resume();
    this.tokenService.set({ token: data.user.realName });
    this.startupSrv.load();
    // 根据不同的角色跳转不同的位置
    if (data.user.role === RoleEnum.ParkManage) {
      this.router.navigateByUrl('/hazard/login-manage/login-plant');
    } else if (data.user.role === RoleEnum.Enterprise) {
      this.router.navigateByUrl('/hazard/safety-map/safety-map-list');
    }
  }


  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      userAccount: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}
