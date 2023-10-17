import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'im-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {
  showWebcam: boolean = false;
  source: string = '';

  constructor() { }

  ngOnInit(): void {
  }
  startCamera() {
    this.showWebcam = true;
  }
  onSeclected(event: string) {
    console.log(event);
    this.source = event;
  }
}
