import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ZipService } from '@delon/abc/zip';
import { ResourceUrl } from '@shared/entities/inspection.type';
import { UppyFile } from '@uppy/core';
import * as JSZip from 'jszip';

@Component({
  selector: 'im-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  showWebcam: boolean = false;
  source: Array<ResourceUrl> = [
    { url: 'https://zlt-1257933030.cos.ap-shanghai.myqcloud.com/meizi/202108-14.mp4' }
  ];

  downloading: boolean = false;

  instance: JSZip | null = null;
  data: { path: string; url: string }[] = [];
  constructor(
    private zip: ZipService,
  ) {

  }

  ngOnInit(): void {
  }
  startCamera() {
    this.showWebcam = true;
  }
  onSeclected(event: {
    [key: string]: UppyFile<any>
  }) {
    const obj = Object.values(event)[0];
    const source = URL.createObjectURL(obj.data);
    this.source.unshift({
      url: source
    });

    /** 准备相关文件数据 */
    this.data = [{
      path: `video/${obj.name}`, url: source
    }]
  }

  /** 下载demo */
  download(): void {
    this.zip.create().then(ret => {
      this.instance = ret

      const promises: Promise<void>[] = [];
      this.data.forEach(item => {
        promises.push(this.zip.pushUrl(this.instance, item.path, item.url));
      });
      Promise.all(promises).then(
        () => {
          this.downloading = true;
          this.zip.save(this.instance, { filename: '视频' }).then(() => {
            this.downloading = false;
            this.data = [];
          });
        },
        (error: {}) => {
          console.warn(error);
        },
      );
    });
  }
}
