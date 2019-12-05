import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'camera-list-modal',
  templateUrl: './camera-list-modal.component.html',
  styleUrls: ['./camera-list-modal.component.scss'],
})
export class CameraListModalComponent implements OnInit {
  @Input() showModel: boolean;
  @Output() showModelChange = new EventEmitter<boolean>();
  constructor(private cdr: ChangeDetectorRef) {
    this.showModel = false;


  }
  close() {
    this.showModel = false;
    this.showModelChange.emit(false);
  }
  ngOnInit() {
  }

}
