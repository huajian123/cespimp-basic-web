import { EVENT_KEY } from '@env/staticVariable';

export const localUrl = 'http://172.16.0.157:8081';
export const webServerUrl = `${localUrl}`;

export const getwayKey = {
  Bs: 'bs',
  Ius: 'ius',
};

export const appInfo = {
  'name': 'Alain',
  'description': 'Ng-zorro admin panel front-end framework',
};

export const enterpriseInfo = JSON.parse(window.sessionStorage.getItem(EVENT_KEY.entprBasicInfo));

export const loginUserInfo = {
  'name': JSON.parse(window.sessionStorage.getItem('loginInfo')) ? JSON.parse(window.sessionStorage.getItem('loginInfo')).userName : 'admin',
  'avatar': './assets/tmp/img/avatar.jpg',
  'email': 'cipchk@qq.com',
};

export const environment = {
  SERVER_URL: `${webServerUrl}`,
  production: true,
  useHash: false,
  hmr: false,
  baseUrl: {
    bs: `${webServerUrl}/`,
    ius: `${webServerUrl}/ius`,
  },
};
