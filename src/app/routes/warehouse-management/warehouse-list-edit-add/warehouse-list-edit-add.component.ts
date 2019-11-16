import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-warehouse-management-warehouse-list-edit-add',
  templateUrl: './warehouse-list-edit-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarehouseManagementWarehouseListEditAddComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  @Input() currentPageNum: number;
  @Output() returnBack: EventEmitter<any>;
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
    })
  }
    returnToList() {
      this.returnBack.emit({refesh: true, pageNo: this.currentPageNum});
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
