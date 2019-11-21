import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'park-introduct',
  templateUrl: './park-introduct.component.html',
  styleUrls: ['./park-introduct.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParkIntroductComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
