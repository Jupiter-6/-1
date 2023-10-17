import { Component, OnInit } from '@angular/core';
import { DownloadService } from './download.service';
// export interface Item {
//   id: string;
//   maintenanceno: string;
//   /** 维修类别 */
//   type: string;
//   housename: string;
//   /** 故障现象 */
//   details: string;
//   /** 维修来源 */
//   mtsource: string;
//   /** 发布日期 */
//   pubtime: string;
//   /** 状态 0：未下载，1：下载中，2：已完成 */
//   download_status: number;
// }

@Component({
  selector: 'im-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  loading = false;
  itemList: any[] = [];

  constructor(
    private service: DownloadService,
  ) { }

  ngOnInit(): void {
    this.getList();
    // this.itemList = [
    //   {
    //     code: 'EGRW2021120034',
    //     type: '维护',
    //     housename: '滨河小区三期滨河小区三期（公共区）门窗',
    //     details: '项目:[开门窗] 设备:[门窗] 采集值:[0.124mm]',
    //     source: '事件',
    //     time: '2021-12-18 14:49:03',
    //     status: 0,
    //   },
    //   {
    //     code: 'EGRW2021120033',
    //     type: '维修',
    //     housename: '翡翠湾',
    //     details: '会议',
    //     source: '事件',
    //     time: '2021-12-18 17:49:03',
    //     status: 1,
    //   },
    //   {
    //     code: 'EGRW2021120032',
    //     type: '维修',
    //     housename: '翡翠湾',
    //     details: '测试预警',
    //     source: '',
    //     time: '2021-12-18 09:49:03',
    //     status: 2,
    //   },
    // ];
  }

  /** 获取列表数据 */
  getList(): void {
    this.itemList = [];
    this.loading = true;
    this.service.getMaintenanceList({}).then((datas) => {
      this.loading = false;
      // console.log(datas);
      this.itemList = datas;
    });
  }

  /** 下载维修任务 */
  download(item: any): void {
    item.download_status = 1;
    const params = { item: { id: item.id } };
    this.service.download(params, item).then((bool) => {
      if (bool) {
        item.download_status = 2;
      }
    });
  }

}
