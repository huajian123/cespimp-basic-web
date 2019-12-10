import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import videojs from 'video.js';
import { SafetyMapService } from '@core/biz-services/safety-map/safety-map.service';

@Component({
  selector: 'camera-list-modal',
  templateUrl: './camera-list-modal.component.html',
  styleUrls: ['./camera-list-modal.component.scss'],
})
export class CameraListModalComponent implements OnInit {
  @Input() showModel: boolean;
  @Input() id: number;
  @Output() showModelChange = new EventEmitter<boolean>();
  player: any;


  constructor(private cdr: ChangeDetectorRef, private dataService: SafetyMapService) {
    this.showModel = false;


  }

  close() {
    this.player.dispose();
    this.showModel = false;
    this.showModelChange.emit(false);
  }


  async getDetailInfo(id?) {
    const dataInfo = await this.dataService.getCameraInfoDetail(id ? id : this.id);
    this.player = videojs('my-video', {
      sources: [{ src: dataInfo }],
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

 /* ngAfterViewInit(): void {

  }*/
}
