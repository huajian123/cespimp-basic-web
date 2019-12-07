import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'camera-list-modal',
  templateUrl: './camera-list-modal.component.html',
  styleUrls: ['./camera-list-modal.component.scss'],
})
export class CameraListModalComponent implements OnInit, AfterViewInit {
  @Input() showModel: boolean;
  @Output() showModelChange = new EventEmitter<boolean>();
  player: any;

  constructor(private cdr: ChangeDetectorRef) {
    this.showModel = false;


  }

  close() {
    this.player.dispose();
    this.showModel = false;
    this.showModelChange.emit(false);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.player = videojs('my-video', {
      sources: [{ src: 'http://cyberplayerplay.kaywang.cn/cyberplayer/demo201711-L1.m3u8' }],
      // sources: [{ src: 'http://192.168.10.9:83/openUrl/618vdN6/live.m3u8'}],
      loop: true,
      muted: true,
      height: 400,
      controls: true,
    });
    this.player.autoplay('muted');
  }
}
