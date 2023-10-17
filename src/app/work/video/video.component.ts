import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceUrl } from '@shared/entities/inspection.type';
import { UppyFile } from '@uppy/core';
import { WorkService } from '../work.service';

@Component({
  selector: 'im-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() pagestatus = 'edit';
  showWebcam: boolean = false;
  source: Array<ResourceUrl> = [];
  item: any = null;

  constructor(
    private routeInfo: ActivatedRoute,
    private service: WorkService,
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
    if (this.item && typeof (this.item.videos) === 'object') {
      this.source = this.item.videos;
    } else {
      // 根据itemid调用接口获取数据
      this.service.getVideoList(itemid).then((datas) => {
        const edocids = datas.map((i) => (i.edocid));

        edocids.map((id: string, index: number) => {
          setTimeout(() => {
            this.source.push({
              async: true,
              url: new Promise((resolve) => {
                this.service.getUrl(id).then((itemurl: any) => {
                  resolve(itemurl);
                });
              }),
              remark: '',
              name: new Date().toString()
            });
          }, index * 1000);
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
    const obj = Object.values(event)[0];
    const source = URL.createObjectURL(obj.data);
    this.source.unshift({
      url: source,
      name: Object.values(event)[0].name ||
        `${new Date().getTime().toString()}.${Object.values(event)[0].extension}`,
      remark: '',
    });
  }

  /** 删除音频 */
  deleteitem(item: any): void {
    this.source.splice(this.source.findIndex(i => item.name === i.name), 1);
    this.synDatabase();
  }

  /** 同步数据 */
  synDatabase(): void {
    this.item = {
      ...this.item,
      videos: this.source
    };
    this.service.id_itemdetil_map[this.item.id] = this.item;
  }
}
