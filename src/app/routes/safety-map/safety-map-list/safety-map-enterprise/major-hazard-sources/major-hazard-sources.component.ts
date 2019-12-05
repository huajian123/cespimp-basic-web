import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'major-hazard-sources',
  templateUrl: './major-hazard-sources.component.html',
  styleUrls: ['./major-hazard-sources.component.scss'],
})
export class MajorHazardSourcesComponent implements OnInit {
  validateForm: FormGroup;
  @Input() showModel: boolean;
  @Output() showModelChange = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder,) {}
  initForm() {
    this.validateForm = this.fb.group({
      roomForm: [null, []],
    });
  }

  close() {
    this.showModel = false;
    this.showModelChange.emit(false);
  }

  ngOnInit() {
    this.initForm();
  }

}
