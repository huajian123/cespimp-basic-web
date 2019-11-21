import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'park-introduction-detail',
  templateUrl: './park-introduction-detail.component.html',
  styleUrls: ['./park-introduction-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParkIntroductionDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
