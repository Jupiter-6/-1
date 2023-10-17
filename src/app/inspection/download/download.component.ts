import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { InspectionApiService } from '@shared/services/inspection-api.service';
import { DatabaseService } from '@shared/services/_database.service';
import { Inspection } from '@shared/entities/database.type';

@Component({
  selector: 'im-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  loading: boolean = false;
  list: Inspection[] = [];
  database: { [key: string]: Inspection } = {};

  constructor(
    private apiService: InspectionApiService,
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
    this.readDatabase();
    this.queryForDown();
  }

  /** 读取数据库 */
  readDatabase() {
    this.database = this.databaseService.read<Inspection>('inspection');
  }

  /** 查询待下载任务 */
  queryForDown() {
    this.loading = true;
    const nowTime = format(new Date(), 'yyyy-MM-dd');
    this.apiService.queryForDown({
      criteria: [{
        name: 'plandate2',
        value1: nowTime
      }],
    }).subscribe((data) => {
      this.loading = false;
      this.list = data?.items || [];
      console.log(data);
    })
  }
  /** 下载任务 */
  download(item: Inspection) {
    item.loading = true;
    this.apiService.download({ item })
      .subscribe((data) => {
        /** 更新下载状态 */
        this.apiService.updatedownloadstatus({ item })
          .subscribe(() => {
            item.loading = false;
            data.item.items.map(i => {
              i.status = 0
              if (i.uploadtime) {
                i.status = 2
              }
            });
            this.databaseService.set('inspection', {
              ...item,
              detail: data.item,
            });
            this.readDatabase(); // 重新读取数据库
          })
      })
  }
}
