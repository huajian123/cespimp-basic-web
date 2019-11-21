import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'publicity-notice-list',
  templateUrl: './publicity-notice-list.component.html',
  styleUrls: ['./publicity-notice-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicityNoticeListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
