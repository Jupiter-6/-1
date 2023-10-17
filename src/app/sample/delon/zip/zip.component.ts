import { Component, OnInit, ChangeDetectorRef, } from '@angular/core';
import { ZipService } from '@delon/abc/zip';
import { environment } from '@env/environment';
import * as JSZip from 'jszip';
@Component({
  selector: 'im-zip',
  templateUrl: './zip.component.html',
  styleUrls: ['./zip.component.scss']
})
export class ZipComponent implements OnInit {
  zipData: any;
  instance: JSZip | null = null;
  data: { path: string; url: string }[] = [
    { path: 'Y71212716-8.jpg', url: `https://qq1639501830.top/static/images/Y71212716-8.jpg?_allow_anonymous` },
    { path: '二次元猫娘老婆/Y71212716-16.jpg', url: `https://qq1639501830.top/static/images/Y71212716-16.jpg?_allow_anonymous` },
    { path: 'Y71212716-3.jpg', url: `https://qq1639501830.top/static/images/Y71212716-3.jpg?_allow_anonymous` },
  ];

  constructor(
    private zip: ZipService,
    private cdr: ChangeDetectorRef,
  ) {
    this.zip.create().then(ret => (this.instance = ret));
  }

  ngOnInit(): void { }


  private format(data: { files: { [key: string]: { dir: string; date: Date } } }): void {
    const files = data.files;
    this.zipData = Object.keys(files).map(key => ({
      name: key,
      dir: files[key].dir,
      date: files[key].date,
    }));
    this.cdr.detectChanges();
  }

  url(): void {
    this.zip.read(environment.assets_prefix + `/assets/js/zip-demo.zip`).then(res => this.format(res));
  }

  change(e: Event): void {
    const file = (e.target as HTMLInputElement).files![0];
    this.zip.read(file).then(res => this.format(res));
  }


  download(): void {
    const promises: Promise<void>[] = [];
    this.data.forEach(item => {
      promises.push(this.zip.pushUrl(this.instance, item.path, item.url));
    });
    Promise.all(promises).then(
      () => {
        this.zip.save(this.instance, { filename:'二次元の猫娘老婆'}).then(() => {
          this.data = [];
        });
      },
      (error: {}) => {
        console.warn(error);
      },
    );
  }
}
