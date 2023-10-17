import { Component, OnInit } from '@angular/core';
import { ResourceUrl } from '@shared/entities/inspection.type';
import { UppyFile } from '@uppy/core';

@Component({
  selector: 'im-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {
  showWebcam: boolean = false;
  source: Array<ResourceUrl> = [
    { url: 'https://zlt-1257933030.cos.ap-shanghai.myqcloud.com/meizi/%E7%8E%8B%E8%B4%B0%E6%B5%AA%20-%20%E5%83%8F%E9%B1%BC.mp3' },
  ];

  constructor() { }

  ngOnInit(): void {
  }
  startCamera() {
    this.showWebcam = true;
  }

  onSeclected(event: {
    [key: string]: UppyFile<any>
  }) {
    const source = URL.createObjectURL(Object.values(event)[0].data);
    this.source.unshift({
      url: source
    });
  }
}
