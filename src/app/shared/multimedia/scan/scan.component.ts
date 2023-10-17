import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'multi-media-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {
  // toggle webcam on/off
  @Input() showWebcam = true;
  @Output() showWebcamChange = new EventEmitter<boolean>();
  @Output() onSeclected = new EventEmitter<string>();
  du: HTMLAudioElement = new Audio(environment.assets_prefix + '/assets/media/du.mp3');

  constructor() { }

  ngOnInit(): void {
  }

  /** 关闭相机 */
  closeWebcam(): void {
    this.showWebcam = false;
    this.showWebcamChange.emit(this.showWebcam);
  }
  onCodeResult(resultString: string) {
    this.onSeclected.emit(resultString);
    this.closeWebcam();
    this.du.play();
  }
}
