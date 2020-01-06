import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { localUrl } from '@env/environment';

@Component({
  selector: 'login-manage-head',
  templateUrl: './login-manage-head.component.html',
  styleUrls: ['./login-manage-head.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginManageHeadComponent implements OnInit {
  @Input() headName: string;
  constructor() { }

  goManagePage(){
    window.open(localUrl + '/hazard/login-manage/park-introduction-manage');
  }

  ngOnInit() {
  }

}
