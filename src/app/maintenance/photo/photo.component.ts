import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ResourceUrl } from '@shared/entities/inspection.type';
import { UppyFile } from '@uppy/core';
import { Maintenance } from '@shared/entities/database.type';
import { MaintenanceService } from '../maintenance.service';

@Component({
  selector: 'im-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  @Input() pagestatus = 'edit';
  showWebcam: boolean = false;
  item: any = null;
  source: Array<ResourceUrl> = [];

  constructor(
    private domSanitizer: DomSanitizer,
    private routeInfo: ActivatedRoute,
    private service: MaintenanceService,
  ) { }

  ngOnInit(): void {
    // 判断路由参数中是否有页面状态
    const pagestatus = this.routeInfo.snapshot.queryParams['pagestatus'];
    if (pagestatus) {
      this.pagestatus = pagestatus;
    }
    // 获取itemid 读取数据库
    const itemid = this.routeInfo.snapshot.params.id;
    // 从本地获取数据
    this.item = this.service.getItem(itemid);
    if (this.item && typeof(this.item.photos) === 'object') {
      this.source = this.item.photos;
    } else {
      // 根据itemid调用接口获取数据
      this.service.getPhotoList(itemid).then((datas) => {
        const edocids = datas.map((i) => (i.edocid));
        edocids.forEach(async (id: string) => {
          this.source.push({
            async: true,
            url: new Promise((resolve) => {
              this.service.getPhotoUrl(id).then((itemurl: any) => {
                resolve(itemurl)
              });
            }),
            remark: '',
            name: new Date().toString()
          });
        });
      });
    }
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
      url: this.domSanitizer.bypassSecurityTrustResourceUrl(source),
      remark: '',
      name: new Date().getTime().toString() + '.png'
    });
    this.synDatabase();
  }

  /** 删除照片 */
  deletePic(item: any): void {
    this.source.splice(this.source.findIndex(i => item.name === i.name), 1);
    this.synDatabase();
  }

  /** 同步数据 */
  synDatabase(): void {
    this.item = {
      ...this.item,
      photos: this.source
    };
    this.service.id_itemdetil_map[this.item.id] = this.item;
  }
}
