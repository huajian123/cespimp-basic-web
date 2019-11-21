import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'login-manage-head',
  templateUrl: './login-manage-head.component.html',
  styleUrls: ['./login-manage-head.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginManageHeadComponent implements OnInit {
  @Input() headName: string;
  constructor() { }

  ngOnInit() {
  }

}
