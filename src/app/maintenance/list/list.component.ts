import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from '../maintenance.service';
import { DatabaseService } from '@shared/services/_database.service';
import { Maintenance } from '@shared/entities/database.type';
import { format } from 'date-fns';

export interface Item {
  code: string;
  name: string;
  housename: string;
  houseaddr: string;
  isstop: boolean;
  createtime: string;
  downloadtime: string;
  partnum: number;
  photonum: number;
  videonum: number;
  audionum: number;
}

@Component({
  selector: 'im-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  loading = false;
  itemList: Maintenance[] = [];
  database: { [key: string]: Maintenance } = {};

  constructor(
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
    // this.itemList = [
    //   {
    //     code: 'EGRW2021120034',
    //     name: '东岱小区东岱小区一区增压一区1#泵1111111111',
    //     housename: '东岱小区',
    //     houseaddr: '童子河以东',
    //     isstop: false,
    //     createtime: '2021-09-24 09:56:17',
    //     downloadtime: '2022-01-04 11:23:06',
    //     partnum: 0,
    //     photonum: 13,
    //     videonum: 5,
    //     audionum: 1,
    //   },
    //   {
    //     code: 'EGRW2021120034',
    //     name: '东岱小区一区增压一区1#泵',
    //     housename: '东岱小区',
    //     houseaddr: '童子河以东1111111111111111111',
    //     isstop: true,
    //     createtime: '2021-09-24 09:56:17',
    //     downloadtime: '2022-01-04 11:23:06',
    //     partnum: 66,
    //     photonum: 0,
    //     videonum: 8,
    //     audionum: 31,
    //   },
    //   {
    //     code: 'EGRW2021120034',
    //     name: '增压一区1#泵',
    //     housename: '东岱小区',
    //     houseaddr: '童子河以东',
    //     isstop: false,
    //     createtime: '2021-09-24 09:56:17',
    //     downloadtime: '2022-01-04 11:23:06',
    //     partnum: 10,
    //     photonum: 123,
    //     videonum: 45,
    //     audionum: 12,
    //   },
    // ];
    this.readDatabase();
    this.getList();
  }


  /** 读取数据库 */
  readDatabase(): void {
    this.database = this.databaseService.read<Maintenance>('maintenance');
  }

  /** 获取列表数据 */
  getList(): void {
    if (Object.keys(this.database).length > 0) {
      this.itemList = Object.values(this.database);
      // this.itemList.forEach((item) => {
      //   item.pubtimeStr = item.pubtime ? format(item.pubtime, 'yyyy-MM-dd HH:mm:ss') : '';
      //   item.downloadtimeStr = item.downloadtime ? format(item.downloadtime, 'yyyy-MM-dd HH:mm:ss') : '';
      // });
    }
    console.log(this.itemList);
  }

}
