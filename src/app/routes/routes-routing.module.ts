import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';


const routes: Routes = [
  { path: '', redirectTo: `passport/login`, pathMatch: 'full' },
  {
    path: 'hazard',
    component: LayoutDefaultComponent,
    // canActivate: [SimpleGuard],
    children: [
      { path: '', redirectTo: 'safety-map', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { title: '仪表盘', titleI18n: 'dashboard' } },
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
     /*重点监管对象*/
      {
        path: 'key-supervision-management',
        loadChildren: () => import('./key-supervision-management/key-supervision-management.module').then(m => m.KeySupervisionManagementModule),
      },
      /*安全一张图*/
      { path: 'safety-map', loadChildren: () => import('./safety-map/safety-map.module').then(m => m.SafetyMapModule) },
      /*基础信息*/
      { path: 'basic-info', loadChildren: () => import('./basic-info/basic-info.module').then(m => m.BasicInfoModule) },
      /*重大危险源*/
      {
        path: 'major-hazard-management',
        loadChildren: () => import('./major-hazard-management/major-hazard-management.module').then(m => m.MajorHazardManagementModule),
      },
      /*储罐*/
      {
        path: 'storage-tank-management',
        loadChildren: () => import('./storage-tank-management/storage-tank-management.module').then(m => m.StorageTankManagementModule),
      },
      /*库房*/
      {
        path: 'warehouse-management',
        loadChildren: () => import('./warehouse-management/warehouse-management.module').then(m => m.WarehouseManagementModule),
      },
      /*生产场所*/
      {
        path: 'production-management',
        loadChildren: () => import('./production-management/production-management.module').then(m => m.ProductionManagementModule),
      },
      /*传感器*/
      {
        path: 'sensor-management',
        loadChildren: () => import('./sensor-management/sensor-management.module').then(m => m.SensorManagementModule),
      },
      /*摄像头*/
      {
        path: 'camera-management',
        loadChildren: () => import('./camera-management/camera-management.module').then(m => m.CameraManagementModule),
      },
      /*报警*/
      {
        path: 'alarm-management',
        loadChildren: () => import('./alarm-management/alarm-management.module').then(m => m.AlarmManagementModule),
      },
      /*特种作业*/
      {
        path: 'special-operation-management',
        loadChildren: () => import('./special-operation-management/special-operation-management.module').then(m => m.SpecialOperationManagementModule),
      },
    ],
  },
  // 全屏布局
  {
      path: 'hazard',
      component: LayoutFullScreenComponent,
      children: [
        { path: '', redirectTo: 'login-manage', pathMatch: 'full' },
        /*登录之后管理模块*/
        { path: 'login-manage', loadChildren: () => import('./login-manage/login-manage.module').then(m => m.LoginManageModule) },
      ]
  },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录', titleI18n: 'pro-login' } },
      { path: 'register', component: UserRegisterComponent, data: { title: '注册', titleI18n: 'pro-register' } },
      {
        path: 'register-result',
        component: UserRegisterResultComponent,
        data: { title: '注册结果', titleI18n: 'pro-register-result' },
      },
      { path: 'lock', component: UserLockComponent, data: { title: '锁屏', titleI18n: 'lock' } },
    ],
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )],
/*  RouterModule.forRoot(
    routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    },
  )],*/
  exports: [RouterModule],
})
export class RouteRoutingModule {
}
