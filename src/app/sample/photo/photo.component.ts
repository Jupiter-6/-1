import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ResourceUrl } from '@shared/entities/inspection.type';
import { UppyFile } from '@uppy/core';

@Component({
  selector: 'im-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  showWebcam: boolean = false;
  source: Array<ResourceUrl> = [
    {
      async: true,
      url: new Promise((r) => {
        setTimeout(() => {
          r('https://qq1639501830.top/static/images/Y71212716-8.jpg')
        }, 100);
      })
    },
    {
      async: true,
      url: new Promise((r) => {
        setTimeout(() => {
          r('https://qq1639501830.top/static/images/Y71212716-3.jpg')
        }, 1000);
      })
    },
  ];

  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }
  startCamera() {
    this.showWebcam = true;
  }
  onSeclected(event: {
    [key: string]: UppyFile<any>
  }) {
    console.log(event);

    const source = URL.createObjectURL(Object.values(event)[0].data);
    this.source.unshift({
      url: this.domSanitizer.bypassSecurityTrustResourceUrl(source)
    });
  }
}
