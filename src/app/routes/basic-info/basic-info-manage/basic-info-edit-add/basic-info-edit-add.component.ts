import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'basic-info-edit-add',
  templateUrl: './basic-info-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoEditAddComponent implements OnInit {
  validateForm: FormGroup;
  form: FormGroup;
  @Input() id: number;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;
  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef) {
    this.returnBack = new EventEmitter<any>();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
    /*  title: [null, [Validators.required]],
      date: [null, [Validators.required]],
      goal: [null, [Validators.required]],
      standard: [null, [Validators.required]],
      client: [null, []],
      invites: [null, []],
      weight: [null, []],
      public: [null, []],
      publicUsers: [null, []],*/
    });
  }
  returnToList() {
    this.returnBack.emit();
  }

  async submit() {
  console.log('点击提交按钮');
    this.returnBack.emit({ refesh: true, pageNo: this.currentPageNum });
  }
}
