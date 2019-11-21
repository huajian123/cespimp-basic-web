import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'industry-dynamics-list',
  templateUrl: './industry-dynamics-list.component.html',
  styleUrls: ['./industry-dynamics-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndustryDynamicsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
