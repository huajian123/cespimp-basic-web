import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShowMessageService } from '../../../../../widget/show-message/show-message';
import { FormBuilder } from '@angular/forms';
import { ParkIntroductManageService } from '@core/biz-services/park-introduct/park-introduct-manage.service';

@Component({
  selector: 'add-edit-park-introduct',
  templateUrl: './add-edit-park-introduct.component.html',
  styles: []
})
export class AddEditParkIntroductComponent implements OnInit {

  constructor(private fb: FormBuilder, private messageService: ShowMessageService, private dataService: ParkIntroductManageService) { }

  ngOnInit() {
  }

}
