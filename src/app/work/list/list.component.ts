import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '@shared/services/_database.service';
import {  Work } from '@shared/entities/database.type';

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
  itemList: Work[] = [];
  database: { [key: string]: Work } = {};

  constructor(
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
    this.readDatabase();
    this.getList();
  }


  /** 读取数据库 */
  readDatabase(): void {
    this.database = this.databaseService.read<Work>('work');
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
  clear() {
    localStorage.removeItem('database');
    this.databaseService.initDatabase(this.databaseService.user);
    window.location.reload();
  }
}
