import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'basic-info-edit-add',
  templateUrl: './basic-info-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoEditAddComponent implements OnInit {
  form: FormGroup;
  submitting = false;


  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      date: [null, [Validators.required]],
      goal: [null, [Validators.required]],
      standard: [null, [Validators.required]],
      client: [null, []],
      invites: [null, []],
      weight: [null, []],
      public: [1, [Validators.min(1), Validators.max(3)]],
      publicUsers: [null, []],
    });
  }

  submit() {
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
      this.msg.success(`提交成功`);
      this.cdr.detectChanges();
    }, 1000);
  }
}