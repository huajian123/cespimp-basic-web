import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import videojs from 'video.js';
import { SafetyMapService, SafetyMapServiceNs } from '@core/biz-services/safety-map/safety-map.service';
import VideoCameraModel = SafetyMapServiceNs.VideoCameraModel;

@Component({
  selector: 'camera-list-modal',
  templateUrl: './camera-list-modal.component.html',
  styleUrls: ['./camera-list-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CameraListModalComponent implements OnInit {
  @Input() showModel: boolean;
  @Input() id: number;
  @Output() showModelChange = new EventEmitter<boolean>();
  player: any;
  // @ts-ignore
  dataInfo: VideoCameraModel;

  constructor(private cdr: ChangeDetectorRef, private dataService: SafetyMapService) {
    this.showModel = false;
    this.dataInfo = {};

  }

  close() {
    this.player.dispose();
    this.showModel = false;
    this.showModelChange.emit(false);
  }


  async getDetailInfo(id?) {
    this.dataInfo = await this.dataService.getCameraInfoDetail(id ? id : this.id);
    this.player = videojs('my-video', {
      sources: [{ src: this.dataInfo.url }],
      loop: true,
      muted: true,
      height: 400,
      controls: true,
    });
    this.player.autoplay('muted');
    this.cdr.markForCheck();
  }

  ngOnInit() {
    this.getDetailInfo();
  }

}
