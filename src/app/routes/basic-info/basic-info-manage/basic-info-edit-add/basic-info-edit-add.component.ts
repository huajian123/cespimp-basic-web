import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'basic-info-edit-add',
  templateUrl: './basic-info-edit-add.component.html',
})
export class BasicInfoEditAddComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
