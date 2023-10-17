import { Component, OnInit } from '@angular/core';
import { DownloadService } from './download.service';

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
  }

  /** 获取列表数据 */
  getList(): void {
    this.itemList = [];
    this.loading = true;
    const user = sessionStorage.getItem('user');
    let criteria = [];
    if (user) {
      criteria.push({
        "name": "officeid",
        "value1": JSON.parse(user).officeid
      })
    }
    this.service.getMaintenanceList({ criteria }).then((datas) => {
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
