import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceUrl } from '@shared/entities/inspection.type';
import { UppyFile } from '@uppy/core';
import { MaintenanceService } from '../maintenance.service';

@Component({
  selector: 'im-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {
  showWebcam: boolean = false;
  source: Array<ResourceUrl> = [];
  item: any = null;
  @Input() pagestatus = 'edit';

  constructor(
    private routeInfo: ActivatedRoute,
    private service: MaintenanceService,
  ) { }

  ngOnInit(): void {
    // 判断路由参数中是否有页面状态
    const pagestatus = this.routeInfo.snapshot.queryParams['pagestatus'];
    if (pagestatus) {
      this.pagestatus = pagestatus;
    }
    // 获取itemid 读取数据
    const itemid = this.routeInfo.snapshot.params.id;
    // 从本地获取数据
    this.item = this.service.getItem(itemid);
    if (this.item && typeof(this.item.audios) === 'object') {
      this.source = this.item.audios;
    } else {
      // 根据itemid调用接口获取数据
      this.service.getAudioList(itemid).then((datas) => {
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
          }, index * 1000)
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
    // console.log(event);
    const source = URL.createObjectURL(Object.values(event)[0].data);
    this.source.unshift({
      url: source,
      name: Object.values(event)[0].name ||
        `${new Date().getTime().toString()}.${Object.values(event)[0].extension}`,
      remark: '',
    });
    this.synDatabase();
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
      audios: this.source
    };
    this.service.id_itemdetil_map[this.item.id] = this.item;
  }

}
