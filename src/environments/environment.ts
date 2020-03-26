// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EVENT_KEY } from '@env/staticVariable';

export const webSocketIp = '172.16.1.18';
export const localUrl = 'http://192.168.1.116:4201';
export const webServerUrl = `${localUrl}/site`;

export const getwayKey = {
  Bs: 'bs',
  Ius: 'ius',
};

export const appInfo = {
  'name': 'Alain',
  'description': 'Ng-zorro admin panel front-end framework',
};

export const loginUserInfo = {
  'name': JSON.parse(window.sessionStorage.getItem('loginInfo')) ? JSON.parse(window.sessionStorage.getItem('loginInfo')).userName : 'admin',
  'avatar': './assets/tmp/img/avatar.jpg',
  'email': 'cipchk@qq.com',
};

export const enterpriseInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.entprBasicInfo));

export const environment = {
  SERVER_URL: `${webServerUrl}`,
  production: false,
  useHash: false,
  hmr: false,
  baseUrl: {
    bs: `${webServerUrl}/`,
    ius: `${webServerUrl}/ius`,
  },
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
